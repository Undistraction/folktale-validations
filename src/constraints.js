import deepFreeze from 'deep-freeze';
import allOfValidator from './helpers/allOfValidator';
import { FIELD_NAMES } from './const';
import configuredValidators from './configuredValidators';

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
  [VALIDATOR]: configuredValidators.validateIsString,
  [IS_REQUIRED]: true,
};

const validatorField = {
  [NAME]: VALIDATOR,
  [VALIDATOR]: configuredValidators.validateIsFunction,
  [IS_REQUIRED]: true,
};

const transformerField = {
  [NAME]: TRANSFORMER,
  [VALIDATOR]: configuredValidators.validateIsFunction,
};

const defaultValueField = {
  [NAME]: DEFAULT_VALUE,
  [VALIDATOR]: configuredValidators.validateIsNotUndefined,
};

const isRequiredField = {
  [NAME]: IS_REQUIRED,
  [VALIDATOR]: configuredValidators.validateIsBoolean,
  [DEFAULT_VALUE]: false,
};

const valueField = {
  [NAME]: VALUE,
  [VALIDATOR]: configuredValidators.validateIsObject,
};

const childrenField = {
  [NAME]: CHILDREN,
  [VALIDATOR]: configuredValidators.validateIsObject,
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
  [VALIDATOR]: configuredValidators.validateIsFunction,
};

const fieldsField = {
  [NAME]: FIELDS,
  [VALIDATOR]: configuredValidators.validateIsArrayOf(
    configuredValidators.validateIsObject
  ),
  [CHILDREN]: {
    fieldsValidator: allOfValidator([
      configuredValidators.validateExclusiveKeys([IS_REQUIRED, DEFAULT_VALUE]),
      configuredValidators.validateExclusiveKeys([VALUE, CHILDREN]),
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
