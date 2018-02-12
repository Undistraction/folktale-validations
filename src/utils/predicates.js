import {
  either,
  compose,
  lte,
  length,
  __,
  complement,
  both,
  equals,
} from 'ramda'
import { isArray, isPlainObj, isString } from 'ramda-adjunct'

export const isNotRegex = v => !(v instanceof RegExp)
export const isPlainObjOrArray = either(isPlainObj, isArray)
export const hasNoMoreThanOneChild = compose(lte(__, 1), length)
export const hasMoreThanOneChild = complement(hasNoMoreThanOneChild)
export const isArrayWithOneChild = both(isArray, compose(equals(__, 1), length))
export const isStringOrArray = either(isString, isArray)
