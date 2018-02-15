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
} from 'ramda'
import { isUndefined, neither } from 'ramda-adjunct'

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
