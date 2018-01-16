'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validateIsString = require('./validators/validateIsString');

var _validateIsString2 = _interopRequireDefault(_validateIsString);

var _validateIsBoolean = require('./validators/validateIsBoolean');

var _validateIsBoolean2 = _interopRequireDefault(_validateIsBoolean);

var _validateIsFunction = require('./validators/validateIsFunction');

var _validateIsFunction2 = _interopRequireDefault(_validateIsFunction);

var _validateIsNotUndefined = require('./validators/validateIsNotUndefined');

var _validateIsNotUndefined2 = _interopRequireDefault(_validateIsNotUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/prefer-default-export
exports.default = [{
  name: 'name',
  validator: _validateIsString2.default,
  isRequired: true
}, {
  name: 'validator',
  validator: _validateIsFunction2.default,
  isRequired: true
}, {
  name: 'transformer',
  validator: _validateIsFunction2.default
}, {
  name: 'isRequired',
  validator: _validateIsBoolean2.default,
  defaultValue: false
}, {
  name: 'defaultValue',
  validator: _validateIsNotUndefined2.default
}];