'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramdaAdjunct = require('ramda-adjunct');

var _const = require('../const');

var _typeValidator = require('../helpers/typeValidator');

var _typeValidator2 = _interopRequireDefault(_typeValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _typeValidator2.default)(_ramdaAdjunct.isString, _const.TYPES.String);