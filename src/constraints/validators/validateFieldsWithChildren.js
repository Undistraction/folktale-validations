import {
  reduce,
  isEmpty,
  identity,
  update,
  assoc,
  concat,
  append,
  toPairs,
  compose,
  always,
  prop,
} from 'ramda';
import { isNotEmpty } from 'ramda-adjunct';
import { validation as Validation } from 'folktale';
import { constraintsForFieldsWithPropChildren } from '../utils';
import {
  reduceObjIndexed,
  reduceObjIndexedWithIndex,
  reduceIf,
} from '../../utils';
import validateObject from './validateObject';

const { collect, Success } = Validation;

// -----------------------------------------------------------------------------
// Replace the children with the validated (possibly transformed) versions.
// -----------------------------------------------------------------------------

const replaceChildrenOfArrayField = reduceObjIndexedWithIndex(
  (acc, [, validation], i) => update(i, validation.value, acc)
);

const replaceChildrenOfArrayFields = (fieldToValidationsMap, o) =>
  reduceObjIndexed(
    (acc, [fieldName, validations]) =>
      assoc(
        fieldName,
        replaceChildrenOfArrayField(prop(fieldName, acc), validations),
        acc
      ),
    o,
    fieldToValidationsMap
  );

// -----------------------------------------------------------------------------
// Validate each child and collect their validations.
// -----------------------------------------------------------------------------

const validateChildrenOfArrayField = (
  fieldName,
  fieldValue,
  childConstraints
) =>
  reduceIf(
    isNotEmpty,
    (acc, child) =>
      append(validateObject(fieldName, childConstraints, child), acc),
    [],
    fieldValue
  );

const validateChildrenOfArrayFields = reduce(
  (acc, [fieldName, fieldValue, childConstraints]) => {
    const childValidations = validateChildrenOfArrayField(
      fieldName,
      fieldValue,
      childConstraints
    );
    return isEmpty(childValidations)
      ? acc
      : assoc(fieldName, childValidations, acc);
  },
  {}
);

// -----------------------------------------------------------------------------
// Process Fields that have children (that have a value that is an array)
// -----------------------------------------------------------------------------

const collectAllValidationsFromChildren = compose(
  reduce((acc, [, value]) => {
    const validations = reduce((acc2, v) => append(v, acc2), [], value);
    return concat(validations, acc);
  }, []),
  toPairs
);

export default constraints => o => {
  const fieldToValidationsMap = compose(
    validateChildrenOfArrayFields,
    constraintsForFieldsWithPropChildren(constraints)
  )(o);

  if (isEmpty(fieldToValidationsMap)) {
    return Success(o);
  }

  return collect(
    collectAllValidationsFromChildren(fieldToValidationsMap)
  ).matchWith({
    Success: always(
      Success(replaceChildrenOfArrayFields(fieldToValidationsMap, o))
    ),
    Failure: identity,
  });
};
