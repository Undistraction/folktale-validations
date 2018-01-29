import { reject } from 'ramda';
import { isFunction, isObject } from 'util';
import { isBoolean, isArray, isString } from 'ramda-adjunct';

const allValues = [
  [],
  {},
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

const withoutBooleanValues = reject(isBoolean, allValues);
const withoutArrayValues = reject(isArray, allValues);
const withoutObjectValues = reject(isObject, allValues);
const withoutStringValues = reject(isString, allValues);
const withoutFunctionValues = reject(isFunction, allValues);

export default {
  withoutBooleanValues,
  withoutArrayValues,
  withoutObjectValues,
  withoutStringValues,
  withoutFunctionValues,
};
