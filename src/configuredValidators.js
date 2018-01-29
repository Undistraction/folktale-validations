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
} from './validators/generatedPredicateValidators';

import validateIsLengthGreaterThan from './validators/validateIsLengthGreaterThan';
import validateIsLengthLessThan from './validators/validateIsLengthLessThan';
import validateIsLengthBetween from './validators/validateIsLengthBetween';
import validateIsWhitelistedValue from './validators/validateIsWhitelistedValue';
import validateObjectValues from './validators/validateObjectValues';
import validateRequiredKeys from './validators/validateRequiredKeys';
import validateWhitelistedKeys from './validators/validateWhitelistedKeys';
import validateArrayElements from './validators/validateArrayElements';
import validateExclusiveKeys from './validators/validateExclusiveKeys';
import validateIsArrayOf from './validators/validateIsArrayOf';

import {
  predicateMessage,
  isWhitelistedStringMessage,
  isLengthGreaterThanMessage,
  isLengthLessThanMessage,
  objectValuesMessage,
  valueErrorMessage,
  missingRequiredKeyErrorMessage,
  invalidKeysErrorMessage,
  arrayElementsErrorMessage,
  arrayElementErrorMessage,
  exclusiveKeyErrorMessage,
} from './messages';

import { PREDICATES } from './const';

export default {
  // Generated Predicates
  validateIsArray: validateIsArray(predicateMessage(PREDICATES.Array)),
  validateIsNotArray: validateIsNotArray(
    predicateMessage(PREDICATES.Array, true)
  ),
  validateIsBoolean: validateIsBoolean(predicateMessage(PREDICATES.Boolean)),
  validateIsNotBoolean: validateIsNotBoolean(
    predicateMessage(PREDICATES.Boolean, true)
  ),
  validateIsString: validateIsString(predicateMessage(PREDICATES.String)),
  validateIsNotString: validateIsNotString(
    predicateMessage(PREDICATES.String, true)
  ),
  validateIsObject: validateIsObject(predicateMessage(PREDICATES.Object)),
  validateIsNotObject: validateIsNotObject(
    predicateMessage(PREDICATES.Object, true)
  ),
  validateIsFunction: validateIsFunction(predicateMessage(PREDICATES.Function)),
  validateIsNotFunction: validateIsNotFunction(
    predicateMessage(PREDICATES.Function, true)
  ),
  validateIsNumber: validateIsNumber(predicateMessage(PREDICATES.Number)),
  validateIsNotNumber: validateIsNotNumber(
    predicateMessage(PREDICATES.Number, true)
  ),
  validateIsDate: validateIsDate(predicateMessage(PREDICATES.Date)),
  validateIsNotDate: validateIsNotDate(predicateMessage(PREDICATES.Date, true)),
  validateIsNaN: validateIsNaN(predicateMessage(PREDICATES.NaN)),
  validateIsNotNaN: validateIsNotNaN(predicateMessage(PREDICATES.NaN, true)),
  validateIsNil: validateIsNil(predicateMessage(PREDICATES.Nil)),
  validateIsNull: validateIsNull(predicateMessage(PREDICATES.Null)),
  validateIsNotNull: validateIsNotNull(predicateMessage(PREDICATES.Null, true)),
  validateIsUndefined: validateIsUndefined(
    predicateMessage(PREDICATES.Undefined)
  ),
  validateIsNotUndefined: validateIsNotUndefined(
    predicateMessage(PREDICATES.Undefined, true)
  ),
  validateIsEmpty: validateIsEmpty(predicateMessage(PREDICATES.Empty)),
  validateIsNotEmpty: validateIsNotEmpty(
    predicateMessage(PREDICATES.Empty, true)
  ),
  validateIsEmptyString: validateIsEmptyString(
    predicateMessage(PREDICATES.EmptyString)
  ),
  validateIsNotEmptyString: validateIsNonEmptyString(
    predicateMessage(PREDICATES.EmptyString, true)
  ),
  validateIsEmptyArray: validateIsEmptyArray(
    predicateMessage(PREDICATES.EmptyArray)
  ),
  validateIsNonEmptyArray: validateIsNonEmptyArray(
    predicateMessage(PREDICATES.EmptyArray, true)
  ),
  validateIsValidNumber: validateIsValidNumber(
    predicateMessage(PREDICATES.ValidNumber)
  ),
  validateIsNotValidNumber: validateIsNotValidNumber(
    predicateMessage(PREDICATES.ValidNumber, true)
  ),
  validateIsValidDate: validateIsValidDate(
    predicateMessage(PREDICATES.ValidDate)
  ),
  validateIsNotValidDate: validateIsNotValidDate(
    predicateMessage(PREDICATES.ValidDate, true)
  ),

  // Custom predicates
  validateIsWhitelistedValue: validateIsWhitelistedValue(
    isWhitelistedStringMessage
  ),
  validateIsLengthGreaterThan: validateIsLengthGreaterThan(
    isLengthGreaterThanMessage
  ),
  validateIsLengthLessThan: validateIsLengthLessThan(isLengthLessThanMessage),
  validateIsLengthBetween: validateIsLengthBetween(isLengthGreaterThanMessage),
  validateObjectValues: validateObjectValues(
    objectValuesMessage,
    valueErrorMessage
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
};
