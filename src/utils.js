import {
  join,
  compose,
  map,
  append,
  flip,
  curry,
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
  either,
  of,
  prepend,
  when,
  always,
  lte,
  __,
  length,
  gt,
  allPass,
} from 'ramda';
import {
  isEmptyString,
  isEmptyArray,
  isUndefined,
  isNotUndefined,
  isString,
  isArray,
  isNull,
  isNaN,
  isObj,
  isNotDate,
  isFunction,
} from 'ramda-adjunct';
import { VALIDATION_VALUE_KEY } from './const';

// -----------------------------------------------------------------------------
// Formatting
// -----------------------------------------------------------------------------

const NEWLINE = `\n`;
const TAB = `\t`;

const stringRepresentationIfNil = compose(
  when(isNull, always(`null`)),
  when(isUndefined, always(`undefined`)),
  when(isNaN, always(`NaN`))
);

const stringRepresentationIfFunction = when(
  isFunction,
  always(`function () {}`)
);

export const joinDefined = withString =>
  compose(
    join(withString),
    reject(anyPass([isEmptyString, isEmptyArray, isUndefined]))
  );

export const joinWithComma = joinDefined(`, `);
export const joinWithAnd = joinDefined(` and `);
export const joinWithOr = joinDefined(` or `);
export const joinWithEmDash = joinDefined(` – `);
export const joinWithColon = joinDefined(`: `);
export const joinWithSpace = joinDefined(` `);
export const joinWithNoSpace = joinDefined(``);

export const wrapWith = (a, b = a) =>
  compose(
    joinWithNoSpace,
    prepend(a),
    append(b),
    of,
    stringRepresentationIfNil,
    stringRepresentationIfFunction
  );
export const wrapWithSingleQuotes = wrapWith(`'`);
export const wrapWithSquareBrackets = wrapWith(`[`, `]`);

export const quoteAndJoinWithComma = compose(
  joinWithComma,
  map(wrapWithSingleQuotes)
);
export const tabsForLevel = compose(joinWithNoSpace, repeat(TAB));

export const newlineAndTabsForLevel = level =>
  joinWithNoSpace([NEWLINE, tabsForLevel(level)]);

export const toTitle = compose(joinWithNoSpace, over(lensIndex(0), toUpper));

export const pluralise = (value, count) =>
  gt(count, 1) ? joinWithNoSpace(value, `s`) : value;

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

export const isNotRegex = v => !(v instanceof RegExp);
export const isVanillaObj = allPass([isObj, isNotRegex, isNotDate]);

export const isVanillaObjectOrArray = either(isVanillaObj, isArray);

// -----------------------------------------------------------------------------
// Objects
// -----------------------------------------------------------------------------

export const { freeze } = Object;

export const deepReplace = curry((pred, replacement, o) =>
  when(
    isVanillaObjectOrArray,
    compose(
      map(a => deepReplace(pred, replacement)(a)),
      map(when(pred, always(replacement)))
    )
  )(o)
);

// -----------------------------------------------------------------------------
// Array
// -----------------------------------------------------------------------------

export const compact = filter(isNotUndefined);
export const appendRight = flip(append);
export const hasOneChildMax = compose(lte(__, 1), length);

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
// Properties
// -----------------------------------------------------------------------------

export const propValue = prop(VALIDATION_VALUE_KEY);

export const isStringOrArray = either(isString, isArray);
