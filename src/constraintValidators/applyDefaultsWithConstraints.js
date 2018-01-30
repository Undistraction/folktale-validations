import {
  compose,
  reduce,
  assoc,
  toPairs,
  ifElse,
  always,
  __,
  unless,
  has,
} from 'ramda';
import { isNotEmpty } from 'ramda-adjunct';
import { validation as Validation } from 'folktale';
import { buildDefaultsMap } from './utils';

const { Success } = Validation;

const applyDefaults = defaults =>
  compose(
    Success,
    reduce(
      (acc, [name, defaultValue]) =>
        unless(has(name), assoc(name, defaultValue))(acc),
      __,
      toPairs(defaults)
    )
  );

export default compose(
  ifElse(isNotEmpty, applyDefaults, always(Success)),
  buildDefaultsMap
);
