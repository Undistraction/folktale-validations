'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramdaAdjunct = require('ramda-adjunct');

var _predicateValidator = require('../helpers/predicateValidator');

var _predicateValidator2 = _interopRequireDefault(_predicateValidator);

var _messages = require('../messages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _predicateValidator2.default)((0, _messages.validNumberErrorMessage)(), _ramdaAdjunct.isValidNumber);