'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramdaAdjunct = require('ramda-adjunct');

var _messages = require('../messages');

var _predicateValidator = require('../helpers/predicateValidator');

var _predicateValidator2 = _interopRequireDefault(_predicateValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _predicateValidator2.default)((0, _messages.isEmptyErrorMessage)(), _ramdaAdjunct.isNotEmpty);