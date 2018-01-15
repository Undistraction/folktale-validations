import { validateIsString } from './validators/validateIsString';
import { validateIsBoolean } from './validators/validateIsBoolean';
import { validateIsFunction } from './validators/validateIsFunction';
import { validateIsNotUndefined } from './validators/validateIsNotUndefined';

// eslint-disable-next-line import/prefer-default-export
export const CONSTRAINTS = [
  {
    name: `name`,
    validator: validateIsString,
    isRequired: true,
  },
  {
    name: `isRequired`,
    validator: validateIsBoolean,
  },
  {
    name: `validator`,
    validator: validateIsFunction,
    isRequired: true,
  },
  {
    name: `default`,
    validator: validateIsNotUndefined,
  },
];
