import validateIsString from './validators/validateIsString';
import validateIsBoolean from './validators/validateIsBoolean';
import validateIsFunction from './validators/validateIsFunction';
import validateIsNotUndefined from './validators/validateIsNotUndefined';
import validateExclusiveKeys from './validators/validateExclusiveKeys';
import validateIsObject from './validators/validateIsObject';
import { validateIsArray } from '.';
import allOfValidator from './helpers/allOfValidator';

const NAME = `name`;
const VALIDATOR = `validator`;
const IS_REQUIRED = `isRequired`;
const DEFAULT_VALUE = `defaultValue`;
const VALUE = `value`;
const CHILDREN = `children`;

const nameField = {
  [NAME]: `name`,
  [VALIDATOR]: validateIsString,
  isRequired: true,
};

const validatorField = {
  [NAME]: `validator`,
  [VALIDATOR]: validateIsFunction,
  [IS_REQUIRED]: true,
};

const transformerField = {
  [NAME]: `transformer`,
  [VALIDATOR]: validateIsFunction,
};

const defaultValueField = {
  [NAME]: `defaultValue`,
  [VALIDATOR]: validateIsNotUndefined,
};

const isRequiredField = {
  [NAME]: `isRequired`,
  [VALIDATOR]: validateIsBoolean,
  [DEFAULT_VALUE]: false,
};

const valueField = {
  [NAME]: `value`,
  [VALIDATOR]: validateIsObject,
};

const childrenField = {
  [NAME]: `children`,
  [VALIDATOR]: validateIsArray,
};

const fields = [
  nameField,
  validatorField,
  transformerField,
  defaultValueField,
  isRequiredField,
  valueField,
  childrenField,
];

const constraints = {
  validator: allOfValidator([
    validateExclusiveKeys([IS_REQUIRED, DEFAULT_VALUE]),
    validateExclusiveKeys([VALUE, CHILDREN]),
  ]),
  fields,
};

// eslint-disable-next-line import/prefer-default-export
export default constraints;
