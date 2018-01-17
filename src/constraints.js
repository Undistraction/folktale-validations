import { append } from 'ramda';
import validateIsString from './validators/validateIsString';
import validateIsBoolean from './validators/validateIsBoolean';
import validateIsFunction from './validators/validateIsFunction';
import validateIsNotUndefined from './validators/validateIsNotUndefined';
import validateObjectWithConstraints from './constraintValidators/validateObjectWithConstraints';
import validateExclusiveKeys from './validators/validateExclusiveKeys';

const NAME = `name`;
const VALIDATOR = `validator`;
const IS_REQUIRED = `isRequired`;
const DEFAULT_VALUE = `defaultValue`;

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

const fields = [
  nameField,
  validatorField,
  transformerField,
  defaultValueField,
  isRequiredField,
];

// const valueField = {
//   name: `value`,
//   validator: validateObjectWithConstraints(baseConstraints),
// };

const constraints = {
  validator: validateExclusiveKeys([IS_REQUIRED, DEFAULT_VALUE]),
  fields,
};

// eslint-disable-next-line import/prefer-default-export
export default constraints;
