import deepFreeze from 'deep-freeze';
import validateIsString from './validators/validateIsString';
import validateIsBoolean from './validators/validateIsBoolean';
import validateIsFunction from './validators/validateIsFunction';
import validateIsNotUndefined from './validators/validateIsNotUndefined';
import validateExclusiveKeys from './validators/validateExclusiveKeys';
import validateIsObject from './validators/validateIsObject';
import allOfValidator from './helpers/allOfValidator';
import validateIsArrayOf from './validators/validateIsArrayOf';
import { freeze } from './utils';

export const FIELD_NAMES = freeze({
  NAME: `name`,
  VALIDATOR: `validator`,
  IS_REQUIRED: `isRequired`,
  DEFAULT_VALUE: `defaultValues`,
  VALUE: `value`,
  CHILDREN: `children`,
});

const NAME = `name`;
const VALIDATOR = `validator`;
const IS_REQUIRED = `isRequired`;
const DEFAULT_VALUE = `defaultValue`;
const VALUE = `value`;
const CHILDREN = `children`;

const nameField = {
  [FIELD_NAMES.NAME]: `name`,
  [FIELD_NAMES.VALIDATOR]: validateIsString,
  isRequired: true,
};

const validatorField = {
  [FIELD_NAMES.NAME]: `validator`,
  [FIELD_NAMES.VALIDATOR]: validateIsFunction,
  [FIELD_NAMES.IS_REQUIRED]: true,
};

const transformerField = {
  [FIELD_NAMES.NAME]: `transformer`,
  [FIELD_NAMES.VALIDATOR]: validateIsFunction,
};

const defaultValueField = {
  [FIELD_NAMES.NAME]: `defaultValue`,
  [FIELD_NAMES.VALIDATOR]: validateIsNotUndefined,
};

const isRequiredField = {
  [FIELD_NAMES.NAME]: `isRequired`,
  [FIELD_NAMES.VALIDATOR]: validateIsBoolean,
  [FIELD_NAMES.DEFAULT_VALUE]: false,
};

const valueField = {
  [FIELD_NAMES.NAME]: `value`,
  [VALIDATOR]: validateIsObject,
};

const childrenField = {
  [FIELD_NAMES.NAME]: `children`,
  [FIELD_NAMES.VALIDATOR]: validateIsObject,
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

// -----------------------------------------------------------------------------

const fieldsValidatorField = {
  [NAME]: `fieldsValidator`,
  [VALIDATOR]: validateIsFunction,
};

const fieldsField = {
  [FIELD_NAMES.NAME]: `fields`,
  [FIELD_NAMES.VALIDATOR]: validateIsArrayOf(validateIsObject),
  [FIELD_NAMES.CHILDREN]: {
    fieldsValidator: allOfValidator([
      validateExclusiveKeys([IS_REQUIRED, DEFAULT_VALUE]),
      validateExclusiveKeys([VALUE, CHILDREN]),
    ]),
    fields,
  },
};

const constraintRoot = {
  fields: [fieldsValidatorField, fieldsField],
};

// Set up a pointer pack to the rootmost object
childrenField.value = constraintRoot;

// eslint-disable-next-line import/prefer-default-export
export default deepFreeze(constraintRoot);
