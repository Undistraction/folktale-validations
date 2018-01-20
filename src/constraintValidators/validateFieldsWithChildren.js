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
// import prettyjson from 'prettyjson';
import { constraintsForFieldsWithPropChildren } from './utils';
import { validateObject } from './validateObjectWithConstraints';
import { reduceObjIndexed } from '../utils';

const { collect, Success } = Validation;

// -----------------------------------------------------------------------------
// Replace Field Values
// -----------------------------------------------------------------------------

const replaceChildrenOfArrayField = (o, validations) => {
  let i = -1;
  return reduceObjIndexed(
    // eslint-disable-next-line no-unused-vars, no-return-assign
    (acc, [key, validation]) => update((i += 1), validation.value, acc),
    o,
    validations
  );
};

const replaceChildrenOfArrayFields = (fieldToValidationsMap, o) => {
  const result = reduceObjIndexed(
    (acc, [fieldName, validations]) => {
      const x = assoc(
        fieldName,
        replaceChildrenOfArrayField(prop(fieldName, acc), validations),
        acc
      );
      return x;
    },
    o,
    fieldToValidationsMap
  );
  return result;
};

// -----------------------------------------------------------------------------
// Validate Field Values
// -----------------------------------------------------------------------------

const validateChildrenOfArrayField = (
  fieldName,
  fieldValue,
  childConstraints
) =>
  reduce(
    (acc, child) => isEmpty(child)
        ? acc
        : append(validateObject(fieldName, childConstraints, child), acc),
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
