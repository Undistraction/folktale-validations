'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _messages = require('../messages');

exports.default = function (validators) {
  return function (o) {
    return (0, _ramda.reduce)(function (accumulatedValidation, validator) {
      return !accumulatedValidation ? validator(o) : accumulatedValidation.orElse(function (errorMessage1) {
        return validator(o).mapFailure(function (errorMessage2) {
          return [(0, _messages.andErrorMessages)([errorMessage1, errorMessage2])];
        });
      });
    }, null)(validators);
  };
};