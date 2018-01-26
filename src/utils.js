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
  has,
  repeat,
} from 'ramda';
import { isEmptyString, isEmptyArray, isUndefined } from 'ramda-adjunct';
import { validation as Validation } from 'folktale';
import { FIELD_NAMES } from './const';

const { Success } = Validation;

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Formatting
// -----------------------------------------------------------------------------

export const joinDefined = s => v => {
  const remaining = reject(anyPass([isEmptyString, isEmptyArray, isUndefined]))(
    v
  );
  const result = join(s, remaining);
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
// Functional Utility
// -----------------------------------------------------------------------------

export const iReduce = addIndex(reduce);
export const reduceObjIndexed = curry((f, acc, v) =>
  compose(reduce(f, acc), toPairs)(v)
);

// -----------------------------------------------------------------------------
// Logging
// -----------------------------------------------------------------------------

const log = curry((loggingFunction, prefix) =>
  tap(
    compose(
      loggingFunction,
      joinWithColon,
      flip(append)([prefix]),
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
// Props / Lenses
// -----------------------------------------------------------------------------

export const propValue = prop(`value`);
export const propName = prop(FIELD_NAMES.NAME);
export const propReason = prop(FIELD_NAMES.REASON);
export const propFields = prop(FIELD_NAMES.FIELDS);

export const hasPropReason = has(FIELD_NAMES.REASON);
