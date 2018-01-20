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
  FIELDS: `fields`,
  FIELDS_VALIDATOR: `fieldsValidator`,
  NAME: `name`,
  VALIDATOR: `validator`,
  TRANSFORMER: `transformer`,
  IS_REQUIRED: `isRequired`,
  DEFAULT_VALUE: `defaultValue`,
  VALUE: `value`,
  CHILDREN: `children`,
});

const {
  FIELDS,
  FIELDS_VALIDATOR,
  NAME,
  VALIDATOR,
  TRANSFORMER,
  IS_REQUIRED,
  DEFAULT_VALUE,
  VALUE,
  CHILDREN,
} = FIELD_NAMES;

const nameField = {
  [NAME]: NAME,
  [VALIDATOR]: validateIsString,
  [IS_REQUIRED]: true,
};

const validatorField = {
  [NAME]: VALIDATOR,
  [VALIDATOR]: validateIsFunction,
  [IS_REQUIRED]: true,
};

const transformerField = {
  [NAME]: TRANSFORMER,
  [VALIDATOR]: validateIsFunction,
};

const defaultValueField = {
  [NAME]: DEFAULT_VALUE,
  [VALIDATOR]: validateIsNotUndefined,
};

const isRequiredField = {
  [NAME]: IS_REQUIRED,
  [VALIDATOR]: validateIsBoolean,
  [DEFAULT_VALUE]: false,
};

const valueField = {
  [NAME]: VALUE,
  [VALIDATOR]: validateIsObject,
};

const childrenField = {
  [NAME]: CHILDREN,
  [VALIDATOR]: validateIsObject,
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
  [NAME]: FIELDS_VALIDATOR,
  [VALIDATOR]: validateIsFunction,
};

const fieldsField = {
  [NAME]: FIELDS,
  [VALIDATOR]: validateIsArrayOf(validateIsObject),
  [CHILDREN]: {
    fieldsValidator: allOfValidator([
      validateExclusiveKeys([IS_REQUIRED, DEFAULT_VALUE]),
      validateExclusiveKeys([VALUE, CHILDREN]),
    ]),
    fields,
  },
};

const constraintRoot = {
  [FIELDS]: [fieldsValidatorField, fieldsField],
};

// Set up a pointer pack to the rootmost object
childrenField.value = constraintRoot;
valueField.value = constraintRoot;

// eslint-disable-next-line import/prefer-default-export
export default deepFreeze(constraintRoot);
