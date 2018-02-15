import { assoc } from 'ramda'
import predicateValidator from '../../helpers/predicateValidator'
import { reduceObjIndexed } from '../../utils/iteration'
import { toValidatorUID } from '../../utils/failures'
import predicates from './predicates'

const buildValidator = (acc, [_, [name, predicate]]) => {
  const validatorUID = toValidatorUID(name)
  return assoc(name, predicateValidator(predicate, validatorUID), acc)
}

export const {
  // Basic Types
  validateIsArray,
  validateIsNotArray,
  validateIsObject,
  validateIsBoolean,
  validateIsNotBoolean,
  validateIsString,
  validateIsNotString,
  validateIsFunction,
  validateIsNotFunction,
  validateIsNumber,
  validateIsNotNumber,
  // Complex Objs
  validateIsDate,
  validateIsNotDate,
  validateIsRegExp,
  validateIsNotRegExp,
  validateIsNotObject,
  validateIsPlainObject,
  validateIsNotPlainObject,
  validateIsNaN,
  validateIsNotNaN,
  validateIsNil,
  validateIsNull,
  validateIsNotNull,
  validateIsUndefined,
  validateIsNotUndefined,
  validateIsEmpty,
  validateIsNotEmpty,
  validateIsEmptyArray,
  validateIsNonEmptyArray,
  validateIsEmptyString,
  validateIsNonEmptyString,
  validateIsValidNumber,
  validateIsNotValidNumber,
  validateIsValidDate,
  validateIsNotValidDate,
  validateIsPositive,
  validateIsNegative,
} = reduceObjIndexed(buildValidator, {}, predicates)
