'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _folktale = require('folktale');

var Success = _folktale.validation.Success,
    Failure = _folktale.validation.Failure;

exports.default = function (errorMessage, predicate) {
  return function (o) {
    return predicate(o) ? Success(o) : Failure([errorMessage]);
  };
};