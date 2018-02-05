import { either, allPass, compose, lte, length, __, complement } from 'ramda'
import { isArray, isObj, isNotDate, isString } from 'ramda-adjunct'

export const isNotRegex = v => !(v instanceof RegExp)
export const isVanillaObj = allPass([isObj, isNotRegex, isNotDate])

export const isVanillaObjectOrArray = either(isVanillaObj, isArray)

export const hasNoMoreThanOneChild = compose(lte(__, 1), length)
export const hasMoreThanOneChild = complement(hasNoMoreThanOneChild)

export const isStringOrArray = either(isString, isArray)
