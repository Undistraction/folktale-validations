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
} from 'ramda';
import { isNotUndefined, isTruthy, isNotEmpty } from 'ramda-adjunct';
import { FIELD_NAMES } from '../constraints';

export const propName = prop(FIELD_NAMES.NAME);
export const pluckName = pluck(FIELD_NAMES.NAME);
export const propEqName = propEq(FIELD_NAMES.NAME);
export const hasIsRequired = has(FIELD_NAMES.IS_REQUIRED);

const hasIsRequiredKey = both(
  hasIsRequired,
  compose(isTruthy, propSatisfies(isTruthy, FIELD_NAMES.IS_REQUIRED))
);

export const requiredKeys = compose(map(propName), filter(hasIsRequiredKey));

export const validatorsMap = reduce(
  (acc, { name, validator }) => assoc(name, validator, acc),
  {}
);

export const transformersMap = reduce(
  (acc, { name, transformer }) =>
    isNotUndefined(transformer) ? assoc(name, transformer, acc) : acc,
  {}
);

export const defaultsMap = reduce(
  (acc, { name, defaultValue }) =>
    isNotUndefined(defaultValue) ? assoc(name, defaultValue, acc) : acc,
  {}
);

// Use each prop of the object to find its constraint.
// Check if the constraint supports children
// If it does, acc the [fieldName, fieldValue, childConstraints]
export const constraintsForFieldsWithProp = name => constraints => (
  acc,
  [fieldName, fieldValue]
) => {
  const constraintForField = find(propEqName(fieldName), constraints);
  const childConstraints = prop(name, constraintForField);
  if (isNotUndefined(childConstraints) && isNotEmpty(fieldValue)) {
    return append([fieldName, fieldValue, childConstraints], acc);
  }
  return acc;
};

export const constraintsForFieldsWithPropChildren = constraints => o =>
  reduce(
    constraintsForFieldsWithProp(FIELD_NAMES.CHILDREN)(constraints),
    [],
    toPairs(o)
  );

export const constraintsForFieldsWithPropValue = constraints => o =>
  reduce(
    constraintsForFieldsWithProp(FIELD_NAMES.VALUE)(constraints),
    [],
    toPairs(o)
  );
