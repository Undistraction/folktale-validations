'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _folktale = require('folktale');

var _messages = require('../messages');

var Success = _folktale.validation.Success,
    Failure = _folktale.validation.Failure;

exports.default = function (validKeys) {
  return function (o) {
    var collectInvalidKeys = (0, _ramda.compose)((0, _ramda.without)(validKeys), _ramda.keys);
    var invalidKeys = collectInvalidKeys(o);
    return (0, _ramda.isEmpty)(invalidKeys) ? Success(o) : Failure([(0, _messages.invalidKeysErrorMessage)(invalidKeys)]);
  };
};