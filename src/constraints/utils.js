import {
  has,
  pluck,
  prop,
  compose,
  filter,
  map,
  reduce,
  assoc,
  both,
  propSatisfies,
  propEq,
  find,
  append,
  toPairs,
  equals,
} from 'ramda';
import { isNotUndefined, isTruthy, isNotEmpty } from 'ramda-adjunct';
import { CONSTRAINT_FIELD_NAMES } from '../const';
import CONSTRAINTS from '../constraints';

// -----------------------------------------------------------------------------
// Properties
// -----------------------------------------------------------------------------

export const propName = prop(CONSTRAINT_FIELD_NAMES.NAME);
export const pluckName = pluck(CONSTRAINT_FIELD_NAMES.NAME);
export const propEqName = propEq(CONSTRAINT_FIELD_NAMES.NAME);
export const hasIsRequired = has(CONSTRAINT_FIELD_NAMES.IS_REQUIRED);

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

const hasIsRequiredKey = both(
  hasIsRequired,
  compose(propSatisfies(isTruthy, CONSTRAINT_FIELD_NAMES.IS_REQUIRED))
);

export const constraintsAreOwnConstraints = equals(CONSTRAINTS);

// -----------------------------------------------------------------------------
// Extract data from validated object
// -----------------------------------------------------------------------------

export const listRequiredKeys = compose(
  map(propName),
  filter(hasIsRequiredKey)
);

export const buildValidatorsMap = reduce(
  (acc, { name, validator }) => assoc(name, validator, acc),
  {}
);

export const buildTransformersMap = reduce(
  (acc, { name, transformer }) =>
    isNotUndefined(transformer) ? assoc(name, transformer, acc) : acc,
  {}
);

export const buildDefaultsMap = reduce(
  (acc, { name, defaultValue }) =>
    isNotUndefined(defaultValue) ? assoc(name, defaultValue, acc) : acc,
  {}
);

// -----------------------------------------------------------------------------
// Update data on validated object
// -----------------------------------------------------------------------------

export const replaceFieldsWithValidationValues = (fieldsToValidationsMap, o) =>
  reduce(
    (acc, [fieldName, validation]) => assoc(fieldName, validation.value, o),
    o,
    toPairs(fieldsToValidationsMap)
  );

// -----------------------------------------------------------------------------
// Extract data from constraints object
// -----------------------------------------------------------------------------

export const constraintsForFieldsWithPropReducer = (name, constraints) => (
  acc,
  [fieldName, fieldValue]
) => {
  const childConstraints = prop(name, find(propEqName(fieldName), constraints));
  if (
    isNotUndefined(childConstraints) &&
    isNotEmpty(childConstraints) &&
    isNotEmpty(fieldValue)
  ) {
    return append([fieldName, fieldValue, childConstraints], acc);
  }
  return acc;
};

export const constraintsForFieldsWithProp = fieldName => constraints =>
  compose(
    reduce(constraintsForFieldsWithPropReducer(fieldName, constraints), []),
    toPairs
  );

export const constraintsForFieldsWithPropChildren = constraintsForFieldsWithProp(
  CONSTRAINT_FIELD_NAMES.CHILDREN
);
export const constraintsForFieldsWithPropValue = constraintsForFieldsWithProp(
  CONSTRAINT_FIELD_NAMES.VALUE
);
