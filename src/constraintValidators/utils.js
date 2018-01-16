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
} from 'ramda';
import { isNotUndefined, isTruthy } from 'ramda-adjunct';

const NAME_KEY = `name`;
const IS_REQUIRED_KEY = `isRequired`;

const hasIsRequiredKey = both(
  has(IS_REQUIRED_KEY),
  compose(isTruthy, propSatisfies(isTruthy, IS_REQUIRED_KEY))
);

const propName = prop(NAME_KEY);
export const pluckName = pluck(NAME_KEY);

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
