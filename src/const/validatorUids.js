import { toValidatorUID } from '../utils/failures'
// ---------------------------------------------------------------------------
// Predicates
// ---------------------------------------------------------------------------
// Basic Types
export const VALIDATE_IS_ARRAY = toValidatorUID(`validateIsArray`)
export const VALIDATE_IS_NOT_ARRAY = toValidatorUID(`validateIsNotArray`)
export const VALIDATE_IS_OBJECT = toValidatorUID(`validateIsObject`)
export const VALIDATE_IS_NOT_OBJECT = toValidatorUID(`validateIsNotObject`)
export const VALIDATE_IS_BOOLEAN = toValidatorUID(`validateIsBoolean`)
export const VALIDATE_IS_NOT_BOOLEAN = toValidatorUID(`validateIsNotBoolean`)
export const VALIDATE_IS_NUMBER = toValidatorUID(`validateIsNumber`)
export const VALIDATE_IS_NOT_NUMBER = toValidatorUID(`validateIsNotNumber`)
export const VALIDATE_IS_STRING = toValidatorUID(`validateIsString`)
export const VALIDATE_IS_NOT_STRING = toValidatorUID(`validateIsNotString`)
export const VALIDATE_IS_FUNCTION = toValidatorUID(`validateIsFunction`)
export const VALIDATE_IS_NOT_FUNCTION = toValidatorUID(`validateIsNotFunction`)
// Complex Objs
export const VALIDATE_IS_DATE = toValidatorUID(`validateIsDate`)
export const VALIDATE_IS_NOT_DATE = toValidatorUID(`validateIsNotDate`)
export const VALIDATE_IS_REGEXP = toValidatorUID(`validateIsRegExp`)
export const VALIDATE_IS_NOT_REGEXP = toValidatorUID(`validateIsNotRegExp`)
export const VALIDATE_IS_PLAIN_OBJECT = toValidatorUID(`validateIsPlainObject`)
export const VALIDATE_IS_NOT_PLAIN_OBJECT = toValidatorUID(
  `validateIsNotPlainObject`
)
// Nil Values
export const VALIDATE_IS_NAN = toValidatorUID(`validateIsNaN`)
export const VALIDATE_IS_NOT_NAN = toValidatorUID(`validateIsNotNaN`)
export const VALIDATE_IS_NIL = toValidatorUID(`validateIsNil`)
export const VALIDATE_IS_NOT_NIL = toValidatorUID(`validateIsNotNil`)
export const VALIDATE_IS_NULL = toValidatorUID(`validateIsNull`)
export const VALIDATE_IS_NOT_NULL = toValidatorUID(`validateIsNotNull`)
export const VALIDATE_IS_UNDEFINED = toValidatorUID(`validateIsUndefined`)
export const VALIDATE_IS_NOT_UNDEFINED = toValidatorUID(
  `validateIsNotUndefined`
)
// Empty
export const VALIDATE_IS_EMPTY = toValidatorUID(`validateIsEmpty`)
export const VALIDATE_IS_NOT_EMPTY = toValidatorUID(`validateIsNotEmpty`)
export const VALIDATE_IS_EMPTY_ARRAY = toValidatorUID(`validateIsEmptyArray`)
export const IS_NON_EMPTY_ARRAY = toValidatorUID(`validateIsNonEmptyArray`)
export const VALIDATE_IS_EMPTY_STRING = toValidatorUID(`validateIsEmptyString`)
export const VALIDATE_IS_NON_EMPTY_STRING = toValidatorUID(
  `validateIsNonEmptyString`
)
// Valid
export const VALIDATE_IS_VALID_DATE = toValidatorUID(`validateIsValidDate`)
export const VALIDATE_IS_NOT_VALID_DATE = toValidatorUID(
  `validateIsNotValidDate`
)
export const VALIDATE_IS_VALID_NUMBER = toValidatorUID(`validateIsValidNumber`)
export const VALIDATE_IS_NOT_VALID_NUMBER = toValidatorUID(
  `validateIsNotValidNumber`
)
// Numeric
export const VALIDATE_IS_INTEGER = toValidatorUID(`validateIsInteger`)
export const VALIDATE_IS_NOT_INTEGER = toValidatorUID(`validateIsNotInteger`)
export const VALIDATE_IS_POSITIVE = toValidatorUID(`validateIsPositive`)
export const VALIDATE_IS_NEGATIVE = toValidatorUID(`validateIsNegative`)
export const VALIDATE_IS_NON_POSITIVE = toValidatorUID(`validateIsNonPositive`)
export const VALIDATE_IS_NON_NEGATIVE = toValidatorUID(`validateIsNonNegative`)

// Truth
export const VALIDATE_IS_TRUE = toValidatorUID(`validateIsTrue`)
export const VALIDATE_IS_FALSE = toValidatorUID(`validateIsFalse`)
export const VALIDATE_IS_TRUTHY = toValidatorUID(`validateIsTruthy`)
export const VALIDATE_IS_FALSY = toValidatorUID(`validateIsFalsy`)

// ---------------------------------------------------------------------------
// Association
// ---------------------------------------------------------------------------
export const VALIDATE_IS_LENGTH_BETWEEN = toValidatorUID(
  `validateIsLengthBetween`
)
export const VALIDATE_IS_LENGTH_GREATER_THAN = toValidatorUID(
  `validateIsLengthGreaterThan`
)
export const VALIDATE_IS_LENGTH_LESS_THAN = toValidatorUID(
  `validateIsLengthLessThan`
)

// ---------------------------------------------------------------------------
// Object
// ---------------------------------------------------------------------------
export const VALIDATE_EXCLUSIVE_KEYS = toValidatorUID(`validateExclusiveKeys`)
export const VALIDATE_OBJECT_VALUES = toValidatorUID(`validateOjectValues`)
export const VALIDATE_REQUIRED_KEYS = toValidatorUID(`validateRequiredKeys`)
export const VALIDATE_WHITELISTED_KEYS = toValidatorUID(
  `validateWhitelistedKeys`
)

// ---------------------------------------------------------------------------
// Other
// ---------------------------------------------------------------------------
export const VALIDATE_IS_WHITELISTED_VALUE = toValidatorUID(
  `validateIsWhitelistedValue`
)
export const VALIDATE_IS_NOT_BLACKLISTED_VALUE = toValidatorUID(
  `isNotBlacklistedValue`
)
export const VALIDATE_IS_NUMBER_WITH_UNIT = toValidatorUID(
  `validateIsNumberWithUnit`
)
export const VALIDATE_IS_VALID_NON_NEGATIVE_NUMBER_WITH_UNIT = toValidatorUID(
  `validateIsValidNonNegativeNumberWithUnit`
)
export const VALIDATE_IS_VALID_POSITIVE_NUMBER_WITH_UNIT = toValidatorUID(
  `validateIsValidPositiveNumberWithUnit`
)
