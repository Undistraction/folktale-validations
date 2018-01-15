import { validateIsString } from './validators/validateIsString';
import { validateIsBoolean } from './validators/validateIsBoolean';
import { validateIsFunction } from './validators/validateIsFunction';
import { validateIsNotUndefined } from './validators/validateIsNotUndefined';

// eslint-disable-next-line import/prefer-default-export
export default [
  {
    name: `name`,
    validator: validateIsString,
    isRequired: true,
  },
  {
    name: `validator`,
    validator: validateIsFunction,
    isRequired: true,
  },
  {
    name: `transformer`,
    validator: validateIsFunction,
  },
  {
    name: `isRequired`,
    validator: validateIsBoolean,
    defaultValue: false,
  },
  {
    name: `default`,
    validator: validateIsNotUndefined,
  },
];
