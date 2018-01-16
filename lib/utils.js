'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quoteAndJoinWithComma = exports.quote = exports.joinWitColon = exports.joinWithOr = exports.joinWithAnd = exports.joinWithComma = undefined;

var _ramda = require('ramda');

// eslint-disable-next-line import/prefer-default-export
var joinWithComma = exports.joinWithComma = (0, _ramda.join)(', ');
var joinWithAnd = exports.joinWithAnd = (0, _ramda.join)(' and ');
var joinWithOr = exports.joinWithOr = (0, _ramda.join)(' or ');
var joinWitColon = exports.joinWitColon = (0, _ramda.join)(': ');
var quote = exports.quote = function quote(value) {
  return '\'' + value + '\'';
};
var quoteAndJoinWithComma = exports.quoteAndJoinWithComma = (0, _ramda.compose)(joinWithComma, (0, _ramda.map)(quote));