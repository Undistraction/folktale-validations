'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _folktale = require('folktale');

var _ramda = require('ramda');

var _messages = require('../messages');

var Success = _folktale.validation.Success,
    _Failure = _folktale.validation.Failure;


var validate = function validate(validatorsMap) {
  return function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        v = _ref2[1];

    var validator = validatorsMap[name];
    return validator ? validator(v).matchWith({
      Success: function Success(_) {
        return acc;
      },
      Failure: function Failure(_ref3) {
        var value = _ref3.value;
        return acc.concat(_Failure([(0, _messages.valueErrorMessage)(name, value)]));
      }
    }) : acc;
  };
};

exports.default = function (validatorsMap) {
  return function (o) {
    return (0, _ramda.compose)((0, _ramda.reduce)(validate(validatorsMap), Success(o)), _ramda.toPairs)(o).orElse(function (message) {
      return _Failure([(0, _messages.valuesErrorMessage)(message)]);
    });
  };
};