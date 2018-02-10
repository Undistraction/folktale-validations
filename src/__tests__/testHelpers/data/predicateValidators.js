import typeData from '../fixtures/typeData'
import {
  validateIsArray,
  validateIsNotArray,
  validateIsObject,
  validateIsNotObject,
  validateIsPlainObject,
  validateIsNotPlainObject,
  validateIsBoolean,
  validateIsNotBoolean,
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
  validateIsFunction,
  validateIsNotFunction,
  validateIsEmpty,
  validateIsNotEmpty,
  validateIsEmptyString,
  validateIsNonEmptyString,
  validateIsEmptyArray,
  validateIsNonEmptyArray,
  validateIsValidNumber,
  validateIsNotValidNumber,
  validateIsValidDate,
  validateIsNotValidDate,
  validateIsPositive,
  validateIsNegative,
} from '../../../index'
import PREDICATES from '../../../const/predicates'
import { toValidatorUID } from '../../../failures/utils'

export default {
  // Types
  [PREDICATES.Array]: {
    uids: [
      toValidatorUID(`validateIsArray`),
      toValidatorUID(`validateIsNotArray`),
    ],
    validators: { validateIsArray, validateIsNotArray },
    values: [typeData.arrayValues, typeData.withoutArrayValues],
  },
  [PREDICATES.plainObject]: {
    uids: [
      toValidatorUID(`validateIsPlainObject`),
      toValidatorUID(`validateIsNotPlainObject`),
    ],
    validators: { validateIsPlainObject, validateIsNotPlainObject },
    values: [typeData.plainObjectValues, typeData.withoutPlainObjectValues],
  },
  [PREDICATES.Object]: {
    uids: [
      toValidatorUID(`validateIsObject`),
      toValidatorUID(`validateIsNotObject`),
    ],
    validators: { validateIsObject, validateIsNotObject },
    values: [typeData.objectValues, typeData.withoutObjectValues],
  },
  [PREDICATES.Boolean]: {
    uids: [
      toValidatorUID(`validateIsBoolean`),
      toValidatorUID(`validateIsNotBoolean`),
    ],
    validators: { validateIsBoolean, validateIsNotBoolean },
    values: [typeData.booleanValues, typeData.withoutBooleanValues],
  },
  [PREDICATES.Number]: {
    uids: [
      toValidatorUID(`validateIsNumber`),
      toValidatorUID(`validateIsNotNumber`),
    ],
    validators: { validateIsNumber, validateIsNotNumber },
    values: [typeData.numericValues, typeData.withoutNumericValues],
  },
  [PREDICATES.Function]: {
    uids: [
      toValidatorUID(`validateIsFunction`),
      toValidatorUID(`validateIsNotFunction`),
    ],
    validators: { validateIsFunction, validateIsNotFunction },
    values: [typeData.functionValues, typeData.withoutFunctionValues],
  },
  [PREDICATES.Date]: {
    uids: [
      toValidatorUID(`validateIsDate`),
      toValidatorUID(`validateIsNotDate`),
    ],
    validators: { validateIsDate, validateIsNotDate },
    values: [typeData.dateValues, typeData.withoutDateValues],
  },
  [PREDICATES.NaN]: {
    uids: [toValidatorUID(`validateIsNaN`), toValidatorUID(`validateIsNotNaN`)],
    validators: { validateIsNaN, validateIsNotNaN },
    values: [NaN, typeData.withoutNaNValues],
  },
  [PREDICATES.Nil]: {
    uids: [toValidatorUID(`validateIsNil`)],
    validators: { validateIsNil },
    values: [[null, undefined], typeData.withoutNilValues],
  },
  [PREDICATES.Null]: {
    uids: [
      toValidatorUID(`validateIsNull`),
      toValidatorUID(`validateIsNotNull`),
    ],
    validators: { validateIsNull, validateIsNotNull },
    values: [[null], typeData.withoutNullValues],
  },
  [PREDICATES.Undefined]: {
    uids: [
      toValidatorUID(`validateIsUndefined`),
      toValidatorUID(`validateIsNotUndefined`),
    ],
    validators: { validateIsUndefined, validateIsNotUndefined },
    values: [[undefined], typeData.withoutUndefinedValues],
  },
  // Empty
  [PREDICATES.empty]: {
    uids: [
      toValidatorUID(`validateIsEmpty`),
      toValidatorUID(`validateIsNotEmpty`),
    ],
    validators: { validateIsEmpty, validateIsNotEmpty },
    values: [typeData.emptyValues, typeData.withoutEmptyValues],
  },
  [PREDICATES.emptyString]: {
    uids: [
      toValidatorUID(`validateIsEmptyString`),
      toValidatorUID(`validateIsNonEmptyString`),
    ],
    validators: { validateIsEmptyString, validateIsNonEmptyString },
    values: [typeData.emptyStringValues, typeData.nonEmptyStringValues],
  },
  [PREDICATES.emptyArray]: {
    uids: [
      toValidatorUID(`validateIsEmptyArray`),
      toValidatorUID(`validateIsNonEmptyArray`),
    ],
    validators: { validateIsEmptyArray, validateIsNonEmptyArray },
    values: [typeData.emptyArrayValues, typeData.nonEmptyArrayValues],
  },
  // Valid
  [PREDICATES.validNumber]: {
    uids: [
      toValidatorUID(`validateIsValidNumber`),
      toValidatorUID(`validateIsNotValidNumber`),
    ],
    validators: { validateIsValidNumber, validateIsNotValidNumber },
    values: [typeData.validNumericValues, typeData.withoutValidNumericValues],
  },
  [PREDICATES.validDate]: {
    uids: [
      toValidatorUID(`validateIsValidDate`),
      toValidatorUID(`validateIsNotValidDate`),
    ],
    validators: { validateIsValidDate, validateIsNotValidDate },
    values: [typeData.validDateValues, typeData.withoutValidDateValues],
  },
  // Numeric
  [PREDICATES.positive]: {
    uids: [toValidatorUID(`validateIsPositive`)],
    validators: { validateIsPositive },
    values: [typeData.positiveNumbers, typeData.negativeNumbersIncludingZero],
  },
  [PREDICATES.negative]: {
    uids: [toValidatorUID(`validateIsNegative`)],
    validators: { validateIsNegative },
    values: [typeData.negativeNumbers, typeData.positiveNumbersIncludingZero],
  },
}
