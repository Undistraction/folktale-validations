import deepFreeze from 'deep-freeze';
import allOfValidator from './helpers/allOfValidator';
import { CONSTRAINT_FIELD_NAMES, OWN_CONSTRAINTS } from './const';

export default validators => {
  const {
    ID,
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
    [VALIDATOR]: validators.validateIsString,
    [IS_REQUIRED]: true,
  };

  const validatorField = {
    [NAME]: VALIDATOR,
    [VALIDATOR]: validators.validateIsFunction,
    [IS_REQUIRED]: true,
  };

  const transformerField = {
    [NAME]: TRANSFORMER,
    [VALIDATOR]: validators.validateIsFunction,
  };

  const defaultValueField = {
    [NAME]: DEFAULT_VALUE,
    [VALIDATOR]: validators.validateIsNotUndefined,
  };

  const isRequiredField = {
    [NAME]: IS_REQUIRED,
    [VALIDATOR]: validators.validateIsBoolean,
    [DEFAULT_VALUE]: false,
  };

  const valueField = {
    [NAME]: VALUE,
    [VALIDATOR]: validators.validateIsObject,
  };

  const childrenField = {
    [NAME]: CHILDREN,
    [VALIDATOR]: validators.validateIsObject,
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
    [VALIDATOR]: validators.validateIsFunction,
  };

  const fieldsField = {
    [NAME]: FIELDS,
    [VALIDATOR]: validators.validateIsArrayOf(validators.validateIsObject),
    [CHILDREN]: {
      fieldsValidator: allOfValidator([
        validators.validateExclusiveKeys([IS_REQUIRED, DEFAULT_VALUE]),
        validators.validateExclusiveKeys([VALUE, CHILDREN]),
      ]),
      fields,
    },
  };

  const constraintRoot = {
    [ID]: OWN_CONSTRAINTS,
    [FIELDS]: [fieldsValidatorField, fieldsField],
  };

  // Set up a pointer pack to the rootmost object
  childrenField.value = constraintRoot;
  valueField.value = constraintRoot;

  // eslint-disable-next-line import/prefer-default-export
  return deepFreeze(constraintRoot);
};
