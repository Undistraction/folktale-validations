'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _folktale = require('folktale');

var _Failure = _folktale.validation.Failure;

exports.default = function (acc, f) {
  return acc.matchWith({
    Success: function Success(_ref) {
      var value = _ref.value;
      return f(value);
    },
    Failure: function Failure(_ref2) {
      var value = _ref2.value;
      return _Failure(value);
    }
  });
};