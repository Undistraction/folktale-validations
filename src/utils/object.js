import {
  ifElse,
  equals,
  merge,
  always,
  flip,
  has,
  curry,
  compose,
  filter,
  pickBy,
} from 'ramda'
import { isUndefined, neither, isNotUndefined } from 'ramda-adjunct'

export const hasFlipped = flip(has)

export const filterKeys = curry((keys, o) =>
  compose(filter(flip(has)(o)))(keys)
)

export const mergeWithDefaults = (defaultValue, value) =>
  ifElse(
    neither(isUndefined, equals(defaultValue)),
    merge(defaultValue),
    always(defaultValue)
  )(value)

export const pickDefined = pickBy(isNotUndefined)
