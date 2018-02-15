import { isNil, isEmpty } from 'ramda'
import {
  isNotArray,
  isArray,
  isBoolean,
  isNotBoolean,
  isNotDate,
  isEmptyArray,
  isNonEmptyArray,
  isNonEmptyString,
  isEmptyString,
  isDate,
  isFunction,
  isString,
  isNotString,
  isNotFunction,
  isNotNaN,
  isNaN,
  isNotNil,
  isNotEmpty,
  isNull,
  isNotNull,
  isNotNumber,
  isNumber,
  isUndefined,
  isNotUndefined,
  isValidDate,
  isNotValidDate,
  isNotValidNumber,
  isValidNumber,
  isPositive,
  isNegative,
  isObject,
  isNotObject,
  isPlainObject,
  isNotPlainObject,
  isNotRegExp,
  isRegExp,
} from 'ramda-adjunct'
import PREDICATE_NAMES from '../../const/predicateNames'
import * as UIDS from '../../const/validatorUids'

export default {
  // ---------------------------------------------------------------------------
  // Basic Types
  // ---------------------------------------------------------------------------
  [UIDS.IS_ARRAY]: [`validateIsArray`, isArray, PREDICATE_NAMES.Array],
  [UIDS.IS_NOT_ARRAY]: [
    `validateIsNotArray`,
    isNotArray,
    PREDICATE_NAMES.Array,
    true,
  ],
  [UIDS.IS_OBJECT]: [`validateIsObject`, isObject, PREDICATE_NAMES.Object],
  [UIDS.IS_NOT_OBJECT]: [
    `validateIsNotObject`,
    isNotObject,
    PREDICATE_NAMES.Object,
    true,
  ],
  [UIDS.IS_BOOLEAN]: [`validateIsBoolean`, isBoolean, PREDICATE_NAMES.Boolean],
  [UIDS.IS_NOT_BOOLEAN]: [
    `validateIsNotBoolean`,
    isNotBoolean,
    PREDICATE_NAMES.Boolean,
    true,
  ],
  [UIDS.IS_STRING]: [`validateIsString`, isString, PREDICATE_NAMES.Date],
  [UIDS.IS_NOT_STRING]: [
    `validateIsNotString`,
    isNotString,
    PREDICATE_NAMES.Date,
    true,
  ],
  [UIDS.IS_FUNCTION]: [
    `validateIsFunction`,
    isFunction,
    PREDICATE_NAMES.Function,
  ],
  [UIDS.IS_NOT_FUNCTION]: [
    `validateIsNotFunction`,
    isNotFunction,
    PREDICATE_NAMES.Function,
    true,
  ],
  [UIDS.IS_NUMBER]: [`validateIsNumber`, isNumber, PREDICATE_NAMES.Number],
  [UIDS.IS_NOT_NUMBER]: [
    `validateIsNotNumber`,
    isNotNumber,
    PREDICATE_NAMES.Number,
    true,
  ],

  // ---------------------------------------------------------------------------
  // Complex Objs
  // ---------------------------------------------------------------------------
  [UIDS.IS_DATE]: [`validateIsDate`, isDate, PREDICATE_NAMES.Date],
  [UIDS.IS_NOT_DATE]: [
    `validateIsNotDate`,
    isNotDate,
    PREDICATE_NAMES.Date,
    true,
  ],
  [UIDS.IS_REGEXP]: [`validateIsRegExp`, isRegExp, PREDICATE_NAMES.RegExp],
  [UIDS.IS_NOT_REGEXP]: [
    `validateIsNotRegExp`,
    isNotRegExp,
    PREDICATE_NAMES.RegExp,
    true,
  ],
  [UIDS.IS_PLAIN_OBJECT]: [
    `validateIsPlainObject`,
    isPlainObject,
    PREDICATE_NAMES.plainObject,
  ],
  [UIDS.IS_NOT_PLAIN_OBJECT]: [
    `validateIsNotPlainObject`,
    isNotPlainObject,
    PREDICATE_NAMES.plainObject,
    true,
  ],

  // ---------------------------------------------------------------------------
  // Nil Value
  // ---------------------------------------------------------------------------
  [UIDS.IS_NAN]: [`validateIsNaN`, isNaN, PREDICATE_NAMES.NaN],
  [UIDS.IS_NOT_NAN]: [`validateIsNotNaN`, isNotNaN, PREDICATE_NAMES.NaN, true],
  [UIDS.IS_NIL]: [`validateIsNil`, isNil, PREDICATE_NAMES.Nil],
  [UIDS.IS_NOT_NIL]: [`validateIsNotNil`, isNotNil, PREDICATE_NAMES.Nil, true],
  [UIDS.IS_NULL]: [`validateIsNull`, isNull, PREDICATE_NAMES.Null],
  [UIDS.IS_NOT_NULL]: [
    `validateIsNotNull`,
    isNotNull,
    PREDICATE_NAMES.Null,
    true,
  ],
  [UIDS.IS_UNDEFINED]: [
    `validateIsUndefined`,
    isUndefined,
    PREDICATE_NAMES.Undefined,
  ],
  [UIDS.IS_NOT_UNDEFINED]: [
    `validateIsNotUndefined`,
    isNotUndefined,
    PREDICATE_NAMES.Undefined,
    true,
  ],

  // ---------------------------------------------------------------------------
  // Empty
  // ---------------------------------------------------------------------------
  [UIDS.IS_EMPTY]: [`validateIsEmpty`, isEmpty, PREDICATE_NAMES.empty],
  [UIDS.IS_NOT_EMPTY]: [
    `validateIsNotEmpty`,
    isNotEmpty,
    PREDICATE_NAMES.empty,
    true,
  ],
  [UIDS.IS_EMPTY_ARRAY]: [
    `validateIsEmptyArray`,
    isEmptyArray,
    PREDICATE_NAMES.emptyArray,
  ],
  [UIDS.IS_NON_EMPTY_ARRAY]: [
    `validateIsNonEmptyArray`,
    isNonEmptyArray,
    PREDICATE_NAMES.emptyArray,
    true,
  ],
  [UIDS.IS_EMPTY_STRING]: [
    `validateIsEmptyString`,
    isEmptyString,
    PREDICATE_NAMES.emptyString,
  ],
  [UIDS.IS_NON_EMPTY_STRING]: [
    `validateIsNonEmptyString`,
    isNonEmptyString,
    PREDICATE_NAMES.emptyString,
    true,
  ],

  // ---------------------------------------------------------------------------
  // Valid
  // ---------------------------------------------------------------------------
  [UIDS.IS_VALID_DATE]: [
    `validateIsValidDate`,
    isValidDate,
    PREDICATE_NAMES.validDate,
  ],
  [UIDS.IS_NOT_VALID_DATE]: [
    `validateIsNotValidDate`,
    isNotValidDate,
    PREDICATE_NAMES.validDate,
    true,
  ],
  [UIDS.IS_VALID_NUMBER]: [
    `validateIsValidNumber`,
    isValidNumber,
    PREDICATE_NAMES.validNumber,
  ],
  [UIDS.IS_NOT_VALID_NUMBER]: [
    `validateIsNotValidNumber`,
    isNotValidNumber,
    PREDICATE_NAMES.validNumber,
    true,
  ],

  // ---------------------------------------------------------------------------
  // Numberic
  // ---------------------------------------------------------------------------
  [UIDS.IS_POSITIVE]: [
    `validateIsPositive`,
    isPositive,
    PREDICATE_NAMES.positive,
  ],
  [UIDS.IS_NEGATIVE]: [
    `validateIsNegative`,
    isNegative,
    PREDICATE_NAMES.negative,
  ],
}
