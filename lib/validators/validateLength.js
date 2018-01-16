'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _predicateValidator = require('../helpers/predicateValidator');

var _predicateValidator2 = _interopRequireDefault(_predicateValidator);

var _messages = require('../messages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use any Ramda relation that returns a boolean for numeric comparison
exports.default = function (relation, comparator) {
  return (0, _predicateValidator2.default)((0, _ramda.compose)(relation(_ramda.__, comparator), _ramda.length), (0, _messages.isInvalidLengthErrorMessage)());
};