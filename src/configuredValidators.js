import validateIsBoolean from './validators/validateIsBoolean';
import validateIsObject from './validators/validateIsObject';
import validateIsFunction from './validators/validateIsFunction';
import validateIsNotEmpty from './validators/validateIsNotEmpty';
import validateIsNotUndefined from './validators/validateIsNotUndefined';
import validateIsLengthBetween from './validators/validateIsLengthBetween';
import validateIsString from './validators/validateIsString';
import validateIsLengthGreaterThan from './validators/validateIsLengthGreaterThan';
import validateIsLengthLessThan from './validators/validateIsLengthLessThan';
import validateIsWhitelistedValue from './validators/validateIsWhitelistedValue';
import validateIsValidNumber from './validators/validateIsValidNumber';
import validateIsArray from './validators/validateIsArray';
import validateObjectValues from './validators/validateObjectValues';
import validateRequiredKeys from './validators/validateRequiredKeys';
import validateWhitelistedKeys from './validators/validateWhitelistedKeys';
import validateArrayElements from './validators/validateArrayElements';
import validateExclusiveKeys from './validators/validateExclusiveKeys';
import validateIsArrayOf from './validators/validateIsArrayOf';

import {
  isTypeMessage,
  isNotEmptyMessage,
  isValidNumberMessage,
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

import { TYPES } from './const';

export default {
  // Basic Types
  validateIsBoolean: validateIsBoolean(isTypeMessage(TYPES.Boolean)),
  validateIsFunction: validateIsFunction(isTypeMessage(TYPES.Function)),
  validateIsString: validateIsString(isTypeMessage(TYPES.String)),
  validateIsArray: validateIsArray(isTypeMessage(TYPES.Array)),
  validateIsObject: validateIsObject(isTypeMessage(TYPES.Object)),
  validateIsNotEmpty: validateIsNotEmpty(isNotEmptyMessage()),
  validateIsNotUndefined: validateIsNotUndefined(
    isTypeMessage(TYPES.Undefined, true)
  ),
  validateIsValidNumber: validateIsValidNumber(isValidNumberMessage()),
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
    isTypeMessage(TYPES.Array),
    arrayElementsErrorMessage,
    arrayElementErrorMessage
  ),
};
