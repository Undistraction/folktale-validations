'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _folktale = require('folktale');

var _messages = require('../messages');

var Failure = _folktale.validation.Failure;

exports.default = function (field, validator) {
  return function (o) {
    return validator(o).orElse(function (message) {
      return Failure((0, _messages.fieldErrorMessage)(field, message));
    });
  };
};