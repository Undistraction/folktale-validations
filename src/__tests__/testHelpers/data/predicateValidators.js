import typeData from '../fixtures/typeData'
import {
  validateIsArray,
  validateIsNotArray,
  validateIsObject,
  validateIsNotObject,
  validateIsBoolean,
  validateIsNotBoolean,
  validateIsNumber,
  validateIsNotNumber,
  validateIsFunction,
  validateIsNotFunction,
  validateIsDate,
  validateIsNotDate,
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
  validateIsEmptyString,
  validateIsNonEmptyString,
  validateIsEmptyArray,
  validateIsNonEmptyArray,
  validateIsValidNumber,
  validateIsNotValidNumber,
  validateIsValidDate,
  validateIsNotValidDate,
  validateIsRegExp,
  validateIsNotRegExp,
  validateIsPositive,
  validateIsNegative,
} from '../../../index'
import PREDICATES from '../../../const/predicateNames'
import {
  VALIDATE_IS_ARRAY,
  VALIDATE_IS_NOT_ARRAY,
  VALIDATE_IS_PLAIN_OBJECT,
  VALIDATE_IS_NOT_PLAIN_OBJECT,
  VALIDATE_IS_OBJECT,
  VALIDATE_IS_BOOLEAN,
  VALIDATE_IS_NOT_BOOLEAN,
  VALIDATE_IS_NOT_OBJECT,
  VALIDATE_IS_NUMBER,
  VALIDATE_IS_NOT_NUMBER,
  VALIDATE_IS_FUNCTION,
  VALIDATE_IS_NOT_FUNCTION,
  VALIDATE_IS_DATE,
  VALIDATE_IS_NOT_DATE,
  VALIDATE_IS_NAN,
  VALIDATE_IS_NOT_NAN,
  VALIDATE_IS_NIL,
  VALIDATE_IS_NULL,
  VALIDATE_IS_NOT_NULL,
  VALIDATE_IS_UNDEFINED,
  VALIDATE_IS_NOT_UNDEFINED,
  VALIDATE_IS_EMPTY,
  VALIDATE_IS_NOT_EMPTY,
  VALIDATE_IS_EMPTY_STRING,
  VALIDATE_IS_NON_EMPTY_STRING,
  VALIDATE_IS_EMPTY_ARRAY,
  IS_NON_EMPTY_ARRAY,
  VALIDATE_IS_VALID_NUMBER,
  VALIDATE_IS_NOT_VALID_NUMBER,
  VALIDATE_IS_VALID_DATE,
  VALIDATE_IS_NOT_VALID_DATE,
  VALIDATE_IS_POSITIVE,
  VALIDATE_IS_NEGATIVE,
  VALIDATE_IS_REGEXP,
  VALIDATE_IS_NOT_REGEXP,
} from '../../../const/validatorUids'

export default {
  // ---------------------------------------------------------------------------
  // Basic Types
  // ---------------------------------------------------------------------------
  [PREDICATES.Array]: {
    uids: [VALIDATE_IS_ARRAY, VALIDATE_IS_NOT_ARRAY],
    validators: { validateIsArray, validateIsNotArray },
    values: [typeData.arrayValues, typeData.withoutArrayValues],
  },
  [PREDICATES.Object]: {
    uids: [VALIDATE_IS_OBJECT, VALIDATE_IS_NOT_OBJECT],
    validators: { validateIsObject, validateIsNotObject },
    values: [typeData.objectValues, typeData.withoutObjectValues],
  },
  [PREDICATES.Boolean]: {
    uids: [VALIDATE_IS_BOOLEAN, VALIDATE_IS_NOT_BOOLEAN],
    validators: { validateIsBoolean, validateIsNotBoolean },
    values: [typeData.booleanValues, typeData.withoutBooleanValues],
  },
  [PREDICATES.Number]: {
    uids: [VALIDATE_IS_NUMBER, VALIDATE_IS_NOT_NUMBER],
    validators: { validateIsNumber, validateIsNotNumber },
    values: [typeData.numericValues, typeData.withoutNumericValues],
  },
  [PREDICATES.Function]: {
    uids: [VALIDATE_IS_FUNCTION, VALIDATE_IS_NOT_FUNCTION],
    validators: { validateIsFunction, validateIsNotFunction },
    values: [typeData.functionValues, typeData.withoutFunctionValues],
  },

  // ---------------------------------------------------------------------------
  // Complex Objs
  // ---------------------------------------------------------------------------
  [PREDICATES.Date]: {
    uids: [VALIDATE_IS_DATE, VALIDATE_IS_NOT_DATE],
    validators: { validateIsDate, validateIsNotDate },
    values: [typeData.dateValues, typeData.withoutDateValues],
  },
  [PREDICATES.RegExp]: {
    uids: [VALIDATE_IS_REGEXP, VALIDATE_IS_NOT_REGEXP],
    validators: { validateIsRegExp, validateIsNotRegExp },
    values: [typeData.regExpValues, typeData.withoutRegExpValues],
  },
  [PREDICATES.plainObject]: {
    uids: [VALIDATE_IS_PLAIN_OBJECT, VALIDATE_IS_NOT_PLAIN_OBJECT],
    validators: { validateIsPlainObject, validateIsNotPlainObject },
    values: [typeData.plainObjectValues, typeData.withoutPlainObjectValues],
  },

  // ---------------------------------------------------------------------------
  // Nil Values
  // ---------------------------------------------------------------------------
  [PREDICATES.NaN]: {
    uids: [VALIDATE_IS_NAN, VALIDATE_IS_NOT_NAN],
    validators: { validateIsNaN, validateIsNotNaN },
    values: [[NaN], typeData.withoutNaNValues],
  },
  [PREDICATES.Nil]: {
    uids: [VALIDATE_IS_NIL],
    validators: { validateIsNil },
    values: [[null, undefined], typeData.withoutNilValues],
  },
  [PREDICATES.Null]: {
    uids: [VALIDATE_IS_NULL, VALIDATE_IS_NOT_NULL],
    validators: { validateIsNull, validateIsNotNull },
    values: [[null], typeData.withoutNullValues],
  },
  [PREDICATES.Undefined]: {
    uids: [VALIDATE_IS_UNDEFINED, VALIDATE_IS_NOT_UNDEFINED],
    validators: { validateIsUndefined, validateIsNotUndefined },
    values: [[undefined], typeData.withoutUndefinedValues],
  },

  // ---------------------------------------------------------------------------
  // Empty
  // ---------------------------------------------------------------------------
  [PREDICATES.empty]: {
    uids: [VALIDATE_IS_EMPTY, VALIDATE_IS_NOT_EMPTY],
    validators: { validateIsEmpty, validateIsNotEmpty },
    values: [typeData.emptyValues, typeData.withoutEmptyValues],
  },
  [PREDICATES.emptyString]: {
    uids: [VALIDATE_IS_EMPTY_STRING, VALIDATE_IS_NON_EMPTY_STRING],
    validators: { validateIsEmptyString, validateIsNonEmptyString },
    values: [typeData.emptyStringValues, typeData.nonEmptyStringValues],
  },
  [PREDICATES.emptyArray]: {
    uids: [VALIDATE_IS_EMPTY_ARRAY, IS_NON_EMPTY_ARRAY],
    validators: { validateIsEmptyArray, validateIsNonEmptyArray },
    values: [typeData.emptyArrayValues, typeData.nonEmptyArrayValues],
  },

  // ---------------------------------------------------------------------------
  // Valid
  // ---------------------------------------------------------------------------
  [PREDICATES.validNumber]: {
    uids: [VALIDATE_IS_VALID_NUMBER, VALIDATE_IS_NOT_VALID_NUMBER],
    validators: { validateIsValidNumber, validateIsNotValidNumber },
    values: [typeData.validNumericValues, typeData.withoutValidNumericValues],
  },
  [PREDICATES.validDate]: {
    uids: [VALIDATE_IS_VALID_DATE, VALIDATE_IS_NOT_VALID_DATE],
    validators: { validateIsValidDate, validateIsNotValidDate },
    values: [typeData.validDateValues, typeData.withoutValidDateValues],
  },

  // ---------------------------------------------------------------------------
  // Numeric
  // ---------------------------------------------------------------------------
  [PREDICATES.positive]: {
    uids: [VALIDATE_IS_POSITIVE],
    validators: { validateIsPositive },
    values: [typeData.positiveNumbers, typeData.negativeNumbersIncludingZero],
  },
  [PREDICATES.negative]: {
    uids: [VALIDATE_IS_NEGATIVE],
    validators: { validateIsNegative },
    values: [typeData.negativeNumbers, typeData.positiveNumbersIncludingZero],
  },
}
