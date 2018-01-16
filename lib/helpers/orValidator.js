'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _anyOfValidator = require('./anyOfValidator');

var _anyOfValidator2 = _interopRequireDefault(_anyOfValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (validator1, validator2) {
  return function (o) {
    return (0, _anyOfValidator2.default)([validator1, validator2])(o);
  };
};