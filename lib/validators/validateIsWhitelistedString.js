'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _folktale = require('folktale');

var _messages = require('../messages');

var Success = _folktale.validation.Success,
    Failure = _folktale.validation.Failure;

exports.default = function (whitelist) {
  return function (o) {
    return (0, _ramda.contains)(o, whitelist) ? Success(o) : Failure([(0, _messages.whitelistErrorMessage)(whitelist)]);
  };
};