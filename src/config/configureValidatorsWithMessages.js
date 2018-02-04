import { assoc } from 'ramda'
import {
  validateIsArray,
  validateIsNotArray,
  validateIsBoolean,
  validateIsNotBoolean,
  validateIsObject,
  validateIsNotObject,
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
} from '../validators/predicate/generatedPredicateValidators'

import validateIsLengthGreaterThan from '../validators/association/validateIsLengthGreaterThan'
import validateIsLengthLessThan from '../validators/association/validateIsLengthLessThan'
import validateIsLengthBetween from '../validators/association/validateIsLengthBetween'
import validateIsWhitelistedValue from '../validators/other/validateIsWhitelistedValue'
import validateObjectValues from '../validators/object/validateObjectValues'
import validateRequiredKeys from '../validators/object/validateRequiredKeys'
import validateWhitelistedKeys from '../validators/object/validateWhitelistedKeys'
import validateExclusiveKeys from '../validators/object/validateExclusiveKeys'
import validateIsArrayOf from '../validators/array/validateIsArrayOf'
import validateArrayElements from '../validators/array/validateArrayElements'

import { PREDICATES } from '../const'
import validateObjectWithConstraints from '../constraints/validators/validateConstraints'

export default messages => {
  const {
    // Predicate
    predicateMessage,
    negatedPredicateMessage,
    // Association
    isLengthGreaterThanMessage,
    isLengthLessThanMessage,
    // Object
    objectValuesMessage,
    invalidKeysErrorMessage,
    missingRequiredKeyErrorMessage,
    objectValueErrorMessage,
    exclusiveKeyErrorMessage,
    // Array
    arrayElementsErrorMessage,
    arrayElementErrorMessage,
    // Other
    isWhitelistedStringMessage,
  } = messages

  const configuredValidators = {
    // -------------------------------------------------------------------------
    // Generated Predicates
    //--------------------------------------------------------------------------

    validateIsArray: validateIsArray(predicateMessage(PREDICATES.Array)),
    validateIsNotArray: validateIsNotArray(
      negatedPredicateMessage(PREDICATES.Array)
    ),
    validateIsBoolean: validateIsBoolean(predicateMessage(PREDICATES.Boolean)),
    validateIsNotBoolean: validateIsNotBoolean(
      negatedPredicateMessage(PREDICATES.Boolean)
    ),
    validateIsString: validateIsString(predicateMessage(PREDICATES.String)),
    validateIsNotString: validateIsNotString(
      negatedPredicateMessage(PREDICATES.String)
    ),
    validateIsObject: validateIsObject(predicateMessage(PREDICATES.Object)),
    validateIsNotObject: validateIsNotObject(
      negatedPredicateMessage(PREDICATES.Object)
    ),
    validateIsFunction: validateIsFunction(
      predicateMessage(PREDICATES.Function)
    ),
    validateIsNotFunction: validateIsNotFunction(
      negatedPredicateMessage(PREDICATES.Function)
    ),
    validateIsNumber: validateIsNumber(predicateMessage(PREDICATES.Number)),
    validateIsNotNumber: validateIsNotNumber(
      negatedPredicateMessage(PREDICATES.Number)
    ),
    validateIsDate: validateIsDate(predicateMessage(PREDICATES.Date)),
    validateIsNotDate: validateIsNotDate(
      negatedPredicateMessage(PREDICATES.Date)
    ),
    validateIsNaN: validateIsNaN(predicateMessage(PREDICATES.NaN)),
    validateIsNotNaN: validateIsNotNaN(negatedPredicateMessage(PREDICATES.NaN)),
    validateIsNil: validateIsNil(predicateMessage(PREDICATES.Nil)),
    validateIsNull: validateIsNull(predicateMessage(PREDICATES.Null)),
    validateIsNotNull: validateIsNotNull(
      negatedPredicateMessage(PREDICATES.Null)
    ),
    validateIsUndefined: validateIsUndefined(
      predicateMessage(PREDICATES.Undefined)
    ),
    validateIsNotUndefined: validateIsNotUndefined(
      negatedPredicateMessage(PREDICATES.Undefined)
    ),
    validateIsEmpty: validateIsEmpty(predicateMessage(PREDICATES.Empty)),
    validateIsNotEmpty: validateIsNotEmpty(
      negatedPredicateMessage(PREDICATES.Empty)
    ),
    validateIsEmptyString: validateIsEmptyString(
      predicateMessage(PREDICATES.EmptyString)
    ),
    validateIsNotEmptyString: validateIsNonEmptyString(
      negatedPredicateMessage(PREDICATES.EmptyString)
    ),
    validateIsEmptyArray: validateIsEmptyArray(
      predicateMessage(PREDICATES.EmptyArray)
    ),
    validateIsNonEmptyArray: validateIsNonEmptyArray(
      negatedPredicateMessage(PREDICATES.EmptyArray)
    ),
    validateIsValidNumber: validateIsValidNumber(
      predicateMessage(PREDICATES.ValidNumber)
    ),
    validateIsNotValidNumber: validateIsNotValidNumber(
      negatedPredicateMessage(PREDICATES.ValidNumber)
    ),
    validateIsValidDate: validateIsValidDate(
      predicateMessage(PREDICATES.ValidDate)
    ),
    validateIsNotValidDate: validateIsNotValidDate(
      negatedPredicateMessage(PREDICATES.ValidDate)
    ),

    // -------------------------------------------------------------------------
    // Custom Predicates
    // -------------------------------------------------------------------------

    validateIsWhitelistedValue: validateIsWhitelistedValue(
      isWhitelistedStringMessage
    ),
    validateIsLengthGreaterThan: validateIsLengthGreaterThan(
      isLengthGreaterThanMessage
    ),
    validateIsLengthLessThan: validateIsLengthLessThan(isLengthLessThanMessage),
    validateIsLengthBetween: validateIsLengthBetween(
      isLengthGreaterThanMessage
    ),
    validateObjectValues: validateObjectValues(
      objectValuesMessage,
      objectValueErrorMessage
    ),
    validateRequiredKeys: validateRequiredKeys(missingRequiredKeyErrorMessage),
    validateWhitelistedKeys: validateWhitelistedKeys(invalidKeysErrorMessage),
    validateArrayElements: validateArrayElements(
      arrayElementsErrorMessage,
      arrayElementErrorMessage
    ),
    validateExclusiveKeys: validateExclusiveKeys(exclusiveKeyErrorMessage),
    validateIsArrayOf: validateIsArrayOf(
      predicateMessage(PREDICATES.Array),
      arrayElementsErrorMessage,
      arrayElementErrorMessage
    ),
  }

  return assoc(
    `validateObjectWithConstraints`,
    validateObjectWithConstraints(configuredValidators),
    configuredValidators
  )
}
