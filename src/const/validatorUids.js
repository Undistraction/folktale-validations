import { toValidatorUID } from '../utils/failures'
// ---------------------------------------------------------------------------
// Predicates
// ---------------------------------------------------------------------------
// Basic Types
export const IS_ARRAY = toValidatorUID(`validateIsArray`)
export const IS_NOT_ARRAY = toValidatorUID(`validateIsNotArray`)
export const IS_OBJECT = toValidatorUID(`validateIsObject`)
export const IS_NOT_OBJECT = toValidatorUID(`validateIsNotObject`)
export const IS_BOOLEAN = toValidatorUID(`validateIsBoolean`)
export const IS_NOT_BOOLEAN = toValidatorUID(`validateIsNotBoolean`)
export const IS_NUMBER = toValidatorUID(`validateIsNumber`)
export const IS_NOT_NUMBER = toValidatorUID(`validateIsNotNumber`)
export const IS_STRING = toValidatorUID(`validateIsString`)
export const IS_NOT_STRING = toValidatorUID(`validateIsNotString`)
export const IS_FUNCTION = toValidatorUID(`validateIsFunction`)
export const IS_NOT_FUNCTION = toValidatorUID(`validateIsNotFunction`)
// Complex Objs
export const IS_DATE = toValidatorUID(`validateIsDate`)
export const IS_NOT_DATE = toValidatorUID(`validateIsNotDate`)
export const IS_REGEXP = toValidatorUID(`validateIsRegExp`)
export const IS_NOT_REGEXP = toValidatorUID(`validateIsNotRegExp`)
export const IS_PLAIN_OBJECT = toValidatorUID(`validateIsPlainObject`)
export const IS_NOT_PLAIN_OBJECT = toValidatorUID(`validateIsNotPlainObject`)
// Nil Values
export const IS_NAN = toValidatorUID(`validateIsNaN`)
export const IS_NOT_NAN = toValidatorUID(`validateIsNotNaN`)
export const IS_NIL = toValidatorUID(`validateIsNil`)
export const IS_NOT_NIL = toValidatorUID(`validateIsNotNil`)
export const IS_NULL = toValidatorUID(`validateIsNull`)
export const IS_NOT_NULL = toValidatorUID(`validateIsNotNull`)
export const IS_UNDEFINED = toValidatorUID(`validateIsUndefined`)
export const IS_NOT_UNDEFINED = toValidatorUID(`validateIsNotUndefined`)
// Empty
export const IS_EMPTY = toValidatorUID(`validateIsEmpty`)
export const IS_NOT_EMPTY = toValidatorUID(`validateIsNotEmpty`)
export const IS_EMPTY_ARRAY = toValidatorUID(`validateIsEmptyArray`)
export const IS_NON_EMPTY_ARRAY = toValidatorUID(`validateIsNonEmptyArray`)
export const IS_EMPTY_STRING = toValidatorUID(`validateIsEmptyString`)
export const IS_NON_EMPTY_STRING = toValidatorUID(`validateIsNonEmptyString`)
// Valid
export const IS_VALID_DATE = toValidatorUID(`validateIsValidDate`)
export const IS_NOT_VALID_DATE = toValidatorUID(`validateIsNotValidDate`)
export const IS_VALID_NUMBER = toValidatorUID(`validateIsValidNumber`)
export const IS_NOT_VALID_NUMBER = toValidatorUID(`validateIsNotValidNumber`)
// Numeric
export const IS_POSITIVE = toValidatorUID(`validateIsPositive`)
export const IS_NEGATIVE = toValidatorUID(`validateIsNegative`)

// ---------------------------------------------------------------------------
// Array
// ---------------------------------------------------------------------------
export const IS_ARRAY_OF = toValidatorUID(`validateIsArrayOf`)
export const ARRAY_ELEMENTS = toValidatorUID(`validateArrayElements`)

// ---------------------------------------------------------------------------
// Association
// ---------------------------------------------------------------------------
export const IS_LENGTH_BETWEEN = toValidatorUID(`validateIsLengthBetween`)
export const IS_LENGTH_GREATER_THAN = toValidatorUID(
  `validateIsLengthGreaterThan`
)
export const IS_LENGTH_LESS_THAN = toValidatorUID(`validateIsLengthLessThan`)

// ---------------------------------------------------------------------------
// Object
// ---------------------------------------------------------------------------
export const EXCLUSIVE_KEYS = toValidatorUID(`validateExclusiveKeys`)
export const OBJECT_VALUES = toValidatorUID(`validateOjectValues`)
export const REQUIRED_KEYS = toValidatorUID(`validateRequiredKeys`)
export const WHITELISTED_KEYS = toValidatorUID(`validateWhitelistedKeys`)

// ---------------------------------------------------------------------------
// Other
// ---------------------------------------------------------------------------
export const IS_WHITELISTED_VALUE = toValidatorUID(`validateIsWhitelistedValue`)
export const IS_NOT_BLACKLISTED_VALUE = toValidatorUID(`isNotBlacklistedValue`)
export const IS_NUMBER_WITH_UNIT = toValidatorUID(`validateIsNumberWithUnit`)
