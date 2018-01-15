import { has, pluck, prop, compose, filter, map, reduce, assoc } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';

const hasIsRequiredKey = has(`isRequired`);
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
