import { assoc } from 'ramda'
import predicateValidator from '../../helpers/predicateValidator'
import { reduceObjIndexed } from '../../utils/iteration'
import { toValidatorUID } from '../../failures/utils'
import predicates from './predicates'

const buildValidator = (acc, [name, [predicate]]) => {
  const validatorUID = toValidatorUID(name)
  return assoc(name, predicateValidator(predicate, validatorUID), acc)
}

export const {
  validateIsArray,
  validateIsNotArray,
  validateIsObject,
  validateIsNotObject,
  validateIsPlainObject,
  validateIsNotPlainObject,
  validateIsBoolean,
  validateIsNotBoolean,
  validateIsString,
  validateIsNotString,
  validateIsFunction,
  validateIsNotFunction,
  validateIsNumber,
  validateIsNotNumber,
  validateIsDate,
  validateIsNotDate,
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
