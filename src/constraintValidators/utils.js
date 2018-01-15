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

const hasIsRequiredKey = both(
  has(`isRequired`),
  compose(isTruthy, propSatisfies(isTruthy, `isRequired`))
);
const propName = prop(`name`);

export const pluckName = pluck(`name`);

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
