import {
  either,
  compose,
  lte,
  length,
  __,
  complement,
  both,
  equals,
  useWith,
  and,
  ifElse,
  any,
  F,
  propSatisfies,
} from 'ramda'
import {
  isNotEmpty,
  isArray,
  isPlainObj,
  isString,
  isNotUndefined,
} from 'ramda-adjunct'
import CONSTRAINT_FIELD_NAMES from '../const/constraintFieldNames'
import { propFields } from '../utils/failures'
import { hasPropDefaultValue, hasPropIsRequired } from './constraints'
import { filterFailures } from './validations'

const { IS_REQUIRED } = CONSTRAINT_FIELD_NAMES

export const isPlainObjOrArray = either(isPlainObj, isArray)
export const hasNoMoreThanOneChild = compose(lte(__, 1), length)
export const hasMoreThanOneChild = complement(hasNoMoreThanOneChild)
export const isArrayWithOneChild = both(isArray, compose(equals(1), length))
export const isStringOrArray = either(isString, isArray)
export const isTrue = equals(true)
export const isRequired = both(
  hasPropIsRequired,
  propSatisfies(isTrue, IS_REQUIRED)
)
export const hasChildFailures = compose(isNotEmpty, filterFailures)

export const multiPredicate = predicates => useWith(and, predicates)

export const hasFieldsWithDefaultValues = v =>
  compose(ifElse(isNotUndefined, any(hasPropDefaultValue), F), propFields)(v)

export const isNotUndefinedOrEmpty = both(isNotEmpty, isNotUndefined)
export const hasValueOrDefaults = multiPredicate([
  isNotEmpty,
  hasFieldsWithDefaultValues,
])
