'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultsMap = exports.transformersMap = exports.validatorsMap = exports.requiredKeys = exports.pluckName = undefined;

var _ramda = require('ramda');

var _ramdaAdjunct = require('ramda-adjunct');

var hasIsRequiredKey = (0, _ramda.both)((0, _ramda.has)('isRequired'), (0, _ramda.compose)(_ramdaAdjunct.isTruthy, (0, _ramda.propSatisfies)(_ramdaAdjunct.isTruthy, 'isRequired')));
var propName = (0, _ramda.prop)('name');

var pluckName = exports.pluckName = (0, _ramda.pluck)('name');

var requiredKeys = exports.requiredKeys = (0, _ramda.compose)((0, _ramda.map)(propName), (0, _ramda.filter)(hasIsRequiredKey));

var validatorsMap = exports.validatorsMap = (0, _ramda.reduce)(function (acc, _ref) {
  var name = _ref.name,
      validator = _ref.validator;
  return (0, _ramda.assoc)(name, validator, acc);
}, {});

var transformersMap = exports.transformersMap = (0, _ramda.reduce)(function (acc, _ref2) {
  var name = _ref2.name,
      transformer = _ref2.transformer;
  return (0, _ramdaAdjunct.isNotUndefined)(transformer) ? (0, _ramda.assoc)(name, transformer, acc) : acc;
}, {});

var defaultsMap = exports.defaultsMap = (0, _ramda.reduce)(function (acc, _ref3) {
  var name = _ref3.name,
      defaultValue = _ref3.defaultValue;
  return (0, _ramdaAdjunct.isNotUndefined)(defaultValue) ? (0, _ramda.assoc)(name, defaultValue, acc) : acc;
}, {});