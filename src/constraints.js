import { append } from 'ramda';
import validateIsString from './validators/validateIsString';
import validateIsBoolean from './validators/validateIsBoolean';
import validateIsFunction from './validators/validateIsFunction';
import validateIsNotUndefined from './validators/validateIsNotUndefined';
import validateObjectWithConstraints from './constraintValidators/validateObjectWithConstraints';

const nameField = {
  name: `name`,
  validator: validateIsString,
  isRequired: true,
};

const validatorField = {
  name: `validator`,
  validator: validateIsFunction,
  isRequired: true,
};

const transformerField = {
  name: `transformer`,
  validator: validateIsFunction,
};

const defaultField = {
  name: `defaultValue`,
  validator: validateIsNotUndefined,
};

const isRequiredField = {
  name: `isRequired`,
  validator: validateIsBoolean,
  defaultValue: false,
};

const fields = [
  nameField,
  validatorField,
  transformerField,
  defaultField,
  isRequiredField,
];

// const valueField = {
//   name: `value`,
//   validator: validateObjectWithConstraints(baseConstraints),
// };

const constraints = {
  fields,
};

// eslint-disable-next-line import/prefer-default-export
export default constraints;
