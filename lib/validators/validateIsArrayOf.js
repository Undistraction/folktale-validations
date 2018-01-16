'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _untilFailureValidator = require('../helpers/untilFailureValidator');

var _untilFailureValidator2 = _interopRequireDefault(_untilFailureValidator);

var _validateIsArray = require('../validators/validateIsArray');

var _validateIsArray2 = _interopRequireDefault(_validateIsArray);

var _validateArrayElements = require('../validators/validateArrayElements');

var _validateArrayElements2 = _interopRequireDefault(_validateArrayElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (validator) {
  return (0, _untilFailureValidator2.default)([_validateIsArray2.default, (0, _validateArrayElements2.default)(validator)]);
};