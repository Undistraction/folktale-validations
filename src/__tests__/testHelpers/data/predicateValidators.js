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
  IS_ARRAY,
  IS_NOT_ARRAY,
  IS_PLAIN_OBJECT,
  IS_NOT_PLAIN_OBJECT,
  IS_OBJECT,
  IS_BOOLEAN,
  IS_NOT_BOOLEAN,
  IS_NOT_OBJECT,
  IS_NUMBER,
  IS_NOT_NUMBER,
  IS_FUNCTION,
  IS_NOT_FUNCTION,
  IS_DATE,
  IS_NOT_DATE,
  IS_NAN,
  IS_NOT_NAN,
  IS_NIL,
  IS_NULL,
  IS_NOT_NULL,
  IS_UNDEFINED,
  IS_NOT_UNDEFINED,
  IS_EMPTY,
  IS_NOT_EMPTY,
  IS_EMPTY_STRING,
  IS_NON_EMPTY_STRING,
  IS_EMPTY_ARRAY,
  IS_NON_EMPTY_ARRAY,
  IS_VALID_NUMBER,
  IS_NOT_VALID_NUMBER,
  IS_VALID_DATE,
  IS_NOT_VALID_DATE,
  IS_POSITIVE,
  IS_NEGATIVE,
  IS_REGEXP,
  IS_NOT_REGEXP,
} from '../../../const/validatorUids'

export default {
  // ---------------------------------------------------------------------------
  // Basic Types
  // ---------------------------------------------------------------------------
  [PREDICATES.Array]: {
    uids: [IS_ARRAY, IS_NOT_ARRAY],
    validators: { validateIsArray, validateIsNotArray },
    values: [typeData.arrayValues, typeData.withoutArrayValues],
  },
  [PREDICATES.Object]: {
    uids: [IS_OBJECT, IS_NOT_OBJECT],
    validators: { validateIsObject, validateIsNotObject },
    values: [typeData.objectValues, typeData.withoutObjectValues],
  },
  [PREDICATES.Boolean]: {
    uids: [IS_BOOLEAN, IS_NOT_BOOLEAN],
    validators: { validateIsBoolean, validateIsNotBoolean },
    values: [typeData.booleanValues, typeData.withoutBooleanValues],
  },
  [PREDICATES.Number]: {
    uids: [IS_NUMBER, IS_NOT_NUMBER],
    validators: { validateIsNumber, validateIsNotNumber },
    values: [typeData.numericValues, typeData.withoutNumericValues],
  },
  [PREDICATES.Function]: {
    uids: [IS_FUNCTION, IS_NOT_FUNCTION],
    validators: { validateIsFunction, validateIsNotFunction },
    values: [typeData.functionValues, typeData.withoutFunctionValues],
  },

  // ---------------------------------------------------------------------------
  // Complex Objs
  // ---------------------------------------------------------------------------
  [PREDICATES.Date]: {
    uids: [IS_DATE, IS_NOT_DATE],
    validators: { validateIsDate, validateIsNotDate },
    values: [typeData.dateValues, typeData.withoutDateValues],
  },
  [PREDICATES.RegExp]: {
    uids: [IS_REGEXP, IS_NOT_REGEXP],
    validators: { validateIsRegExp, validateIsNotRegExp },
    values: [typeData.regExpValues, typeData.withoutRegExpValues],
  },
  [PREDICATES.plainObject]: {
    uids: [IS_PLAIN_OBJECT, IS_NOT_PLAIN_OBJECT],
    validators: { validateIsPlainObject, validateIsNotPlainObject },
    values: [typeData.plainObjectValues, typeData.withoutPlainObjectValues],
  },

  // ---------------------------------------------------------------------------
  // Nil Values
  // ---------------------------------------------------------------------------
  [PREDICATES.NaN]: {
    uids: [IS_NAN, IS_NOT_NAN],
    validators: { validateIsNaN, validateIsNotNaN },
    values: [[NaN], typeData.withoutNaNValues],
  },
  [PREDICATES.Nil]: {
    uids: [IS_NIL],
    validators: { validateIsNil },
    values: [[null, undefined], typeData.withoutNilValues],
  },
  [PREDICATES.Null]: {
    uids: [IS_NULL, IS_NOT_NULL],
    validators: { validateIsNull, validateIsNotNull },
    values: [[null], typeData.withoutNullValues],
  },
  [PREDICATES.Undefined]: {
    uids: [IS_UNDEFINED, IS_NOT_UNDEFINED],
    validators: { validateIsUndefined, validateIsNotUndefined },
    values: [[undefined], typeData.withoutUndefinedValues],
  },

  // ---------------------------------------------------------------------------
  // Empty
  // ---------------------------------------------------------------------------
  [PREDICATES.empty]: {
    uids: [IS_EMPTY, IS_NOT_EMPTY],
    validators: { validateIsEmpty, validateIsNotEmpty },
    values: [typeData.emptyValues, typeData.withoutEmptyValues],
  },
  [PREDICATES.emptyString]: {
    uids: [IS_EMPTY_STRING, IS_NON_EMPTY_STRING],
    validators: { validateIsEmptyString, validateIsNonEmptyString },
    values: [typeData.emptyStringValues, typeData.nonEmptyStringValues],
  },
  [PREDICATES.emptyArray]: {
    uids: [IS_EMPTY_ARRAY, IS_NON_EMPTY_ARRAY],
    validators: { validateIsEmptyArray, validateIsNonEmptyArray },
    values: [typeData.emptyArrayValues, typeData.nonEmptyArrayValues],
  },

  // ---------------------------------------------------------------------------
  // Valid
  // ---------------------------------------------------------------------------
  [PREDICATES.validNumber]: {
    uids: [IS_VALID_NUMBER, IS_NOT_VALID_NUMBER],
    validators: { validateIsValidNumber, validateIsNotValidNumber },
    values: [typeData.validNumericValues, typeData.withoutValidNumericValues],
  },
  [PREDICATES.validDate]: {
    uids: [IS_VALID_DATE, IS_NOT_VALID_DATE],
    validators: { validateIsValidDate, validateIsNotValidDate },
    values: [typeData.validDateValues, typeData.withoutValidDateValues],
  },

  // ---------------------------------------------------------------------------
  // Numeric
  // ---------------------------------------------------------------------------
  [PREDICATES.positive]: {
    uids: [IS_POSITIVE],
    validators: { validateIsPositive },
    values: [typeData.positiveNumbers, typeData.negativeNumbersIncludingZero],
  },
  [PREDICATES.negative]: {
    uids: [IS_NEGATIVE],
    validators: { validateIsNegative },
    values: [typeData.negativeNumbers, typeData.positiveNumbersIncludingZero],
  },
}
