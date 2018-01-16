'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _folktale = require('folktale');

var _ramda = require('ramda');

var _chain = require('../utils/chain');

var _chain2 = _interopRequireDefault(_chain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Success = _folktale.validation.Success;

exports.default = function (validators) {
  return function (o) {
    return (0, _ramda.reduce)(_chain2.default, Success(o), validators);
  };
};