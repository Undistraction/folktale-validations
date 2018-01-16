'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _untilFailureValidator = require('../helpers/untilFailureValidator');

var _untilFailureValidator2 = _interopRequireDefault(_untilFailureValidator);

var _validateWhitelistedKeys = require('../validators/validateWhitelistedKeys');

var _validateWhitelistedKeys2 = _interopRequireDefault(_validateWhitelistedKeys);

var _validateRequiredKeys = require('../validators/validateRequiredKeys');

var _validateRequiredKeys2 = _interopRequireDefault(_validateRequiredKeys);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (constraints) {
  return (0, _untilFailureValidator2.default)([(0, _validateWhitelistedKeys2.default)((0, _utils.pluckName)(constraints)), (0, _validateRequiredKeys2.default)((0, _utils.requiredKeys)(constraints))]);
};