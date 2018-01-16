'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _folktale = require('folktale');

var _ramda = require('ramda');

var _ramdaAdjunct = require('ramda-adjunct');

var _messages = require('../messages');

var Success = _folktale.validation.Success,
    Failure = _folktale.validation.Failure;


var toErr = (0, _ramda.compose)(Failure, (0, _ramda.flip)(_ramda.append)([]), (0, _ramda.when)(_ramdaAdjunct.isArray, _messages.andErrorMessages));

exports.default = function (validators) {
  return function (o) {
    return (0, _ramda.reduce)(function (acc, validator) {
      return acc.concat(validator(o));
    }, Success(o), validators).orElse(toErr);
  };
};