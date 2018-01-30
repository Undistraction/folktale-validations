import deepFreeze from 'deep-freeze';
import allOfValidator from './helpers/allOfValidator';
import { CONSTRAINT_FIELD_NAMES } from './const';
import validatorsWithMessages from './defaults/validatorsWithMessages';

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
} = CONSTRAINT_FIELD_NAMES;

const nameField = {
  [NAME]: NAME,
  [VALIDATOR]: validatorsWithMessages.validateIsString,
  [IS_REQUIRED]: true,
};

const validatorField = {
  [NAME]: VALIDATOR,
  [VALIDATOR]: validatorsWithMessages.validateIsFunction,
  [IS_REQUIRED]: true,
};

const transformerField = {
  [NAME]: TRANSFORMER,
  [VALIDATOR]: validatorsWithMessages.validateIsFunction,
};

const defaultValueField = {
  [NAME]: DEFAULT_VALUE,
  [VALIDATOR]: validatorsWithMessages.validateIsNotUndefined,
};

const isRequiredField = {
  [NAME]: IS_REQUIRED,
  [VALIDATOR]: validatorsWithMessages.validateIsBoolean,
  [DEFAULT_VALUE]: false,
};

const valueField = {
  [NAME]: VALUE,
  [VALIDATOR]: validatorsWithMessages.validateIsObject,
};

const childrenField = {
  [NAME]: CHILDREN,
  [VALIDATOR]: validatorsWithMessages.validateIsObject,
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
  [VALIDATOR]: validatorsWithMessages.validateIsFunction,
};

const fieldsField = {
  [NAME]: FIELDS,
  [VALIDATOR]: validatorsWithMessages.validateIsArrayOf(
    validatorsWithMessages.validateIsObject
  ),
  [CHILDREN]: {
    fieldsValidator: allOfValidator([
      validatorsWithMessages.validateExclusiveKeys([
        IS_REQUIRED,
        DEFAULT_VALUE,
      ]),
      validatorsWithMessages.validateExclusiveKeys([VALUE, CHILDREN]),
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
