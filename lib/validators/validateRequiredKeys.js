'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _folktale = require('folktale');

var _ramda = require('ramda');

var _messages = require('../messages');

var Success = _folktale.validation.Success,
    Failure = _folktale.validation.Failure;

exports.default = function (requiredKeys) {
  return function (o) {
    var collectInvalidKeys = (0, _ramda.reject)((0, _ramda.flip)(_ramda.has)(o));
    var invalidKeys = collectInvalidKeys(requiredKeys);
    return (0, _ramda.isEmpty)(invalidKeys) ? Success(o) : Failure([(0, _messages.missingRequiredKeyErrorMessage)(invalidKeys)]);
  };
};