'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _predicateValidator = require('./predicateValidator');

var _predicateValidator2 = _interopRequireDefault(_predicateValidator);

var _messages = require('../messages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (predicate, typeName) {
  var complement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return (0, _predicateValidator2.default)((0, _messages.typeErrorMessage)(typeName, complement), predicate);
};