import {
  compose,
  map,
  append,
  flip,
  curry,
  addIndex,
  reduce,
  toPairs,
  prop,
  mapObjIndexed,
  filter,
  either,
  lte,
  __,
  length,
} from 'ramda'
import { isNotUndefined, isString, isArray } from 'ramda-adjunct'
import { VALIDATION_VALUE_KEY } from './const'

// -----------------------------------------------------------------------------
// Array
// -----------------------------------------------------------------------------

export const compact = filter(isNotUndefined)
export const appendRight = flip(append)
export const hasOneChildMax = compose(lte(__, 1), length)

// -----------------------------------------------------------------------------
// Iteration
// -----------------------------------------------------------------------------

export const reduceObjIndexed = curry((f, acc, v) =>
  compose(reduce(f, acc), toPairs)(v)
)

export const reduceWithIndex = addIndex(reduce)
export const mapWithIndex = addIndex(map)

export const mapObjIndexedWithIndex = addIndex(mapObjIndexed)
export const reduceObjIndexedWithIndex = addIndex(reduceObjIndexed)

const predicateIterator = (predicate, iterator) => (acc, v) =>
  predicate(v) ? iterator(acc, v) : acc

export const reduceIf = curry((predicate, iterator, acc, v) =>
  reduce(predicateIterator(predicate, iterator), acc, v)
)

// -----------------------------------------------------------------------------
// Properties
// -----------------------------------------------------------------------------

export const propValue = prop(VALIDATION_VALUE_KEY)

export const isStringOrArray = either(isString, isArray)
