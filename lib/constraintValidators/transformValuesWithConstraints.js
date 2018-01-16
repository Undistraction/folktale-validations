'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _ramdaAdjunct = require('ramda-adjunct');

var _folktale = require('folktale');

var _utils = require('./utils');

var Success = _folktale.validation.Success;


var transformValues = function transformValues(transformers) {
  return (0, _ramda.compose)(Success, (0, _ramda.reduce)(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        transformer = _ref2[1];

    return (0, _ramda.assoc)(name, transformer((0, _ramda.prop)(name, acc)))(acc);
  }, _ramda.__, (0, _ramda.toPairs)(transformers)));
};

exports.default = function (constraints) {
  return (0, _ramda.ifElse)(_ramdaAdjunct.isNotEmpty, transformValues, (0, _ramda.always)(Success))((0, _utils.transformersMap)(constraints));
};