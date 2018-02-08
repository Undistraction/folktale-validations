import { either, allPass, compose, lte, length, __, complement } from 'ramda'
import { isArray, isPlainObj, isNotDate, isString } from 'ramda-adjunct'

export const isNotRegex = v => !(v instanceof RegExp)

export const isVanillaObjectOrArray = either(isPlainObj, isArray)

export const hasNoMoreThanOneChild = compose(lte(__, 1), length)
export const hasMoreThanOneChild = complement(hasNoMoreThanOneChild)

export const isStringOrArray = either(isString, isArray)
