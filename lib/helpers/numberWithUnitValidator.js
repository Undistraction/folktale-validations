'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cssjsUnits = require('cssjs-units');

var _predicateValidator = require('./predicateValidator');

var _predicateValidator2 = _interopRequireDefault(_predicateValidator);

var _messages = require('../messages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a type validator
exports.default = function (unit) {
  return (0, _predicateValidator2.default)((0, _messages.numberWithUnitErrorMessage)(unit), (0, _cssjsUnits.isNumberWithUnit)([unit]));
};