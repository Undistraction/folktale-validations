'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _untilFailureValidator = require('../helpers/untilFailureValidator');

var _untilFailureValidator2 = _interopRequireDefault(_untilFailureValidator);

var _validateObjectKeysWithConstraints = require('./validateObjectKeysWithConstraints');

var _validateObjectKeysWithConstraints2 = _interopRequireDefault(_validateObjectKeysWithConstraints);

var _validateValues = require('../validators/validateValues');

var _validateValues2 = _interopRequireDefault(_validateValues);

var _validateConstraints = require('./validateConstraints');

var _validateConstraints2 = _interopRequireDefault(_validateConstraints);

var _applyDefaultsWithConstraints = require('./applyDefaultsWithConstraints');

var _applyDefaultsWithConstraints2 = _interopRequireDefault(_applyDefaultsWithConstraints);

var _transformValuesWithConstraints = require('./transformValuesWithConstraints');

var _transformValuesWithConstraints2 = _interopRequireDefault(_transformValuesWithConstraints);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (constraints) {
  return function (o) {
    return (0, _validateConstraints2.default)(constraints).matchWith({
      Success: function Success(_) {
        return (0, _untilFailureValidator2.default)([(0, _validateObjectKeysWithConstraints2.default)(constraints), (0, _validateValues2.default)((0, _utils.validatorsMap)(constraints)), (0, _applyDefaultsWithConstraints2.default)(constraints), (0, _transformValuesWithConstraints2.default)(constraints)])(o);
      },
      Failure: _ramda.identity
    });
  };
};