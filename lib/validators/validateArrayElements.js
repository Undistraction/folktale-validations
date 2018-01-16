'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _folktale = require('folktale');

var _ramda = require('ramda');

var _messages = require('../messages');

var _Success = _folktale.validation.Success,
    _Failure = _folktale.validation.Failure;


var validateAllWith = function validateAllWith(validator) {
  return function (o) {
    return (0, _ramda.reduce)(function (acc, element) {
      return acc.concat(validator(element).orElse(function (message) {
        return _Failure([(0, _messages.arrayElementErrorMessage)(element, message)]);
      }));
    }, _Success(), o);
  };
};

exports.default = function (validator) {
  return function (o) {
    var v = validateAllWith(validator);
    var validation = v(o);
    return validation.matchWith({
      Success: function Success(_) {
        return _Success(o);
      },
      Failure: function Failure(_ref) {
        var value = _ref.value;
        return _Failure([(0, _messages.arrayElementsErrorMessage)(value)]);
      }
    });
  };
};