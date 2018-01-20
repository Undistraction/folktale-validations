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
import { validation as Validation } from 'folktale';
import { constraintsForFieldsWithPropChildren } from './utils';
import { validateObject } from './validateObjectWithConstraints';
import { iReduce, reduceObjIndexed } from '../utils';

const { collect, Success } = Validation;

// -----------------------------------------------------------------------------
// Replace Field Values
// -----------------------------------------------------------------------------

const replaceChildrenOfArrayField = (o, fieldToValidationsMap) =>
  reduceObjIndexed(
    (acc, [validation, fieldName]) => update(fieldName, validation.value, o),
    o,
    fieldToValidationsMap
  );

const replaceChildrenOfArrayFields = (fieldToValidationsMap, o) =>
  reduceObjIndexed(
    (acc, [fieldName, validation]) =>
      assoc(
        fieldName,
        replaceChildrenOfArrayField(prop(fieldName, acc), validation),
        acc
      ),
    o,
    fieldToValidationsMap
  );

// -----------------------------------------------------------------------------
// Validate Field Values
// -----------------------------------------------------------------------------

const validateChildrenOfArrayField = (
  fieldName,
  fieldValue,
  childConstraints
) =>
  iReduce(
    (acc, child, index) => {
      if (isEmpty(child)) {
        return acc;
      }
      acc[index] = validateObject(fieldName, childConstraints, child);
      return acc;
    },
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
// Process Fields that have children - that have a value that is an array
// -----------------------------------------------------------------------------

const collectAllValidationsFromChildren = compose(
  // eslint-disable-next-line no-unused-vars
  reduce((acc, [key, value]) => {
    const its = reduce((acc2, v) => append(v, acc2), [], value);
    return concat(its, acc);
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

  const allValidations = collectAllValidationsFromChildren(
    fieldToValidationsMap
  );

  return collect(allValidations).matchWith({
    Success: always(
      Success(replaceChildrenOfArrayFields(fieldToValidationsMap, o))
    ),
    Failure: identity,
  });
};
