import {
  join,
  compose,
  map,
  append,
  flip,
  curry,
  tap,
  addIndex,
  reduce,
  toPairs,
  prop,
  reject,
  anyPass,
  repeat,
  over,
  lensIndex,
  toUpper,
  mapObjIndexed,
  filter,
} from 'ramda';
import {
  isEmptyString,
  isEmptyArray,
  isUndefined,
  isNotUndefined,
} from 'ramda-adjunct';
import { validation as Validation } from 'folktale';
import { VALIDATION_VALUE_KEY } from './const';

const { Success } = Validation;

// -----------------------------------------------------------------------------
// Formatting
// -----------------------------------------------------------------------------

export const joinDefined = withString => values => {
  const remaining = reject(anyPass([isEmptyString, isEmptyArray, isUndefined]))(
    values
  );
  const result = join(withString, remaining);
  return result;
};

export const joinWithComma = joinDefined(`, `);
export const joinWithAnd = joinDefined(` and `);
export const joinWithOr = joinDefined(` or `);
export const joinWithColon = joinDefined(`: `);
export const joinWithSpace = joinDefined(` `);
export const joinWithNoSpace = joinDefined(``);
export const quote = value => `'${value}'`;
export const wrapSB = value => `[${value}]`;
export const quoteAndJoinWithComma = compose(joinWithComma, map(quote));
export const tabsForLevel = compose(joinWithNoSpace, repeat(`\t`));

// -----------------------------------------------------------------------------
// Objects
// -----------------------------------------------------------------------------

export const { freeze } = Object;

// -----------------------------------------------------------------------------
// Array
// -----------------------------------------------------------------------------

export const compact = filter(isNotUndefined);
export const appendRight = flip(append);

// -----------------------------------------------------------------------------
// String
// -----------------------------------------------------------------------------

export const toTitle = compose(joinWithNoSpace, over(lensIndex(0), toUpper));

// -----------------------------------------------------------------------------
// Iteration
// -----------------------------------------------------------------------------

export const reduceObjIndexed = curry((f, acc, v) =>
  compose(reduce(f, acc), toPairs)(v)
);

export const reduceWithIndex = addIndex(reduce);
export const mapWithIndex = addIndex(map);

export const mapObjIndexedWithIndex = addIndex(mapObjIndexed);
export const reduceObjIndexedWithIndex = addIndex(reduceObjIndexed);

const predicateIterator = (predicate, iterator) => (acc, v) =>
  predicate(v) ? iterator(acc, v) : acc;

export const reduceIf = curry((predicate, iterator, acc, v) =>
  reduce(predicateIterator(predicate, iterator), acc, v)
);

// -----------------------------------------------------------------------------
// Logging
// -----------------------------------------------------------------------------

const log = curry((loggingFunction, prefix) =>
  tap(
    compose(
      loggingFunction,
      joinWithColon,
      appendRight([prefix]),
      JSON.stringify
    )
  )
);

// eslint-disable-next-line no-console
export const logToConsole = log(console.log);

export const loggingValidator = message => validation => {
  logToConsole(message)(validation);
  return Success(validation);
};

// -----------------------------------------------------------------------------
// Properties
// -----------------------------------------------------------------------------

export const propValue = prop(VALIDATION_VALUE_KEY);
