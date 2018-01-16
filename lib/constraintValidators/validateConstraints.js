'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validateObjectKeysWithConstraints = require('./validateObjectKeysWithConstraints');

var _validateObjectKeysWithConstraints2 = _interopRequireDefault(_validateObjectKeysWithConstraints);

var _constraints = require('../constraints');

var _constraints2 = _interopRequireDefault(_constraints);

var _untilFailureValidator = require('../helpers/untilFailureValidator');

var _untilFailureValidator2 = _interopRequireDefault(_untilFailureValidator);

var _validateIsObject = require('../validators/validateIsObject');

var _validateIsObject2 = _interopRequireDefault(_validateIsObject);

var _validateIsArrayOf = require('../validators/validateIsArrayOf');

var _validateIsArrayOf2 = _interopRequireDefault(_validateIsArrayOf);

var _validateIsNotEmpty = require('../validators/validateIsNotEmpty');

var _validateIsNotEmpty2 = _interopRequireDefault(_validateIsNotEmpty);

var _validateIsArray = require('../validators/validateIsArray');

var _validateIsArray2 = _interopRequireDefault(_validateIsArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _untilFailureValidator2.default)([_validateIsArray2.default, _validateIsNotEmpty2.default, (0, _validateIsArrayOf2.default)((0, _untilFailureValidator2.default)([_validateIsObject2.default, (0, _validateObjectKeysWithConstraints2.default)(_constraints2.default)]))]);