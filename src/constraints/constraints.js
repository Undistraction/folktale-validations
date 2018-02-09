import deepFreeze from 'deep-freeze'
import allOfValidator from '../helpers/allOfValidator'
import { CONSTRAINT_FIELD_NAMES, OWN_CONSTRAINTS } from '../const'

export default validators => {
  const {
    validateIsString,
    validateIsFunction,
    validateIsNotUndefined,
    validateIsBoolean,
    validateIsPlainObject,
    validateIsArrayOf,
    validateExclusiveKeys,
  } = validators

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
  } = CONSTRAINT_FIELD_NAMES

  const nameField = {
    [NAME]: NAME,
    [VALIDATOR]: validateIsString,
    [IS_REQUIRED]: true,
  }

  const validatorField = {
    [NAME]: VALIDATOR,
    [VALIDATOR]: validateIsFunction,
    [IS_REQUIRED]: true,
  }

  const transformerField = {
    [NAME]: TRANSFORMER,
    [VALIDATOR]: validateIsFunction,
  }

  const defaultValueField = {
    [NAME]: DEFAULT_VALUE,
    [VALIDATOR]: validateIsNotUndefined,
  }

  const isRequiredField = {
    [NAME]: IS_REQUIRED,
    [VALIDATOR]: validateIsBoolean,
    [DEFAULT_VALUE]: false,
  }

  const valueField = {
    [NAME]: VALUE,
    [VALIDATOR]: validateIsPlainObject,
  }

  const childrenField = {
    [NAME]: CHILDREN,
    [VALIDATOR]: validateIsPlainObject,
  }

  const fields = [
    nameField,
    validatorField,
    transformerField,
    defaultValueField,
    isRequiredField,
    valueField,
    childrenField,
  ]

  const fieldsValidatorField = {
    [NAME]: FIELDS_VALIDATOR,
    [VALIDATOR]: validateIsFunction,
  }

  const fieldsField = {
    [NAME]: FIELDS,
    [VALIDATOR]: validateIsArrayOf(validateIsPlainObject),
    [CHILDREN]: {
      [FIELDS_VALIDATOR]: allOfValidator([
        validateExclusiveKeys([IS_REQUIRED, DEFAULT_VALUE]),
        validateExclusiveKeys([VALUE, CHILDREN]),
      ]),
      fields,
    },
  }

  const constraintRoot = {
    [ID]: OWN_CONSTRAINTS,
    [FIELDS]: [fieldsValidatorField, fieldsField],
  }

  // Set up a pointer pack to the rootmost object
  childrenField.value = constraintRoot
  valueField.value = constraintRoot

  // eslint-disable-next-line import/prefer-default-export
  return deepFreeze(constraintRoot)
}
