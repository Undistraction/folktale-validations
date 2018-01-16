'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orErrorMessages = exports.andErrorMessages = exports.validNumberErrorMessage = exports.isEmptyErrorMessage = exports.isInvalidLengthErrorMessage = exports.missingRequiredKeyErrorMessage = exports.numberWithUnitErrorMessage = exports.valuesErrorMessage = exports.valueErrorMessage = exports.invalidKeysErrorMessage = exports.whitelistErrorMessage = exports.arrayElementsErrorMessage = exports.arrayElementErrorMessage = exports.typeErrorMessage = exports.fieldErrorMessage = undefined;

var _ramda = require('ramda');

var _utils = require('./utils');

var prefixForTypeErrorMessage = function prefixForTypeErrorMessage(complement) {
  return complement ? 'Was type' : 'Wasn\'t type';
};

var fieldErrorMessage = exports.fieldErrorMessage = function fieldErrorMessage(field, errorMessage) {
  return 'Field \'' + field + '\': ' + errorMessage;
};

var typeErrorMessage = exports.typeErrorMessage = function typeErrorMessage(typeName) {
  var complement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0, _utils.joinWitColon)([prefixForTypeErrorMessage(complement), (0, _utils.quote)(typeName)]);
};

var arrayElementErrorMessage = exports.arrayElementErrorMessage = function arrayElementErrorMessage(value, message) {
  return '\'' + value + '\': ' + message;
};

var arrayElementsErrorMessage = exports.arrayElementsErrorMessage = function arrayElementsErrorMessage(elementErrorMessages) {
  return 'Array contained invalid element(s): ' + elementErrorMessages;
};

var whitelistErrorMessage = exports.whitelistErrorMessage = function whitelistErrorMessage(whitelist) {
  return 'Value wasn\'t one of the accepted values: ' + (0, _utils.joinWithComma)(whitelist);
};

var invalidKeysErrorMessage = exports.invalidKeysErrorMessage = function invalidKeysErrorMessage(invalidKeys) {
  return 'Object included invalid key(s): \'[' + (0, _utils.joinWithComma)(invalidKeys) + ']\'';
};

var valueErrorMessage = exports.valueErrorMessage = function valueErrorMessage(name, value) {
  return 'Key ' + (0, _utils.quote)(name) + ': ' + value;
};

var valuesErrorMessage = exports.valuesErrorMessage = function valuesErrorMessage(messages) {
  return 'Object included invalid values(s): ' + (0, _utils.joinWithComma)(messages);
};

var numberWithUnitErrorMessage = exports.numberWithUnitErrorMessage = function numberWithUnitErrorMessage(unit) {
  return 'Wasn\'t number with unit: ' + (0, _utils.quote)(unit);
};

var missingRequiredKeyErrorMessage = exports.missingRequiredKeyErrorMessage = function missingRequiredKeyErrorMessage(keys) {
  return 'Object was missing required key(s): [' + (0, _utils.quoteAndJoinWithComma)(keys) + ']';
};

var isInvalidLengthErrorMessage = exports.isInvalidLengthErrorMessage = (0, _ramda.always)('Invalid length');

var isEmptyErrorMessage = exports.isEmptyErrorMessage = (0, _ramda.always)('Was Empty');

var validNumberErrorMessage = exports.validNumberErrorMessage = (0, _ramda.always)('Wasn\'t a valid Number');

var andErrorMessages = exports.andErrorMessages = _utils.joinWithAnd;
var orErrorMessages = exports.orErrorMessages = _utils.joinWithOr;