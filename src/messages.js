import { always } from 'ramda';
import { joinWithComma, quoteAndJoinWithComma } from './utils';
import { joinWithAnd } from '../lib/utils';

export const fieldErrorMessage = (field, errorMessage) =>
  `Field '${field}': ${errorMessage}`;

export const typeErrorMessage = typeName => `Wasn't type: '${typeName}'`;

export const arrayElementErrorMessage = (value, message) =>
  `'${value}': ${message}`;

export const arrayElementsErrorMessage = elementErrorMessages =>
  `Array contained invalid element(s): ${elementErrorMessages}`;

export const whitelistErrorMessage = whitelist =>
  `Value wan't one of the accepted values: ${joinWithComma(whitelist)}`;

export const invalidKeysErrorMessage = invalidKeys =>
  `Object included invalid key(s): '[${joinWithComma(invalidKeys)}]'`;

export const valueErrorMessage = (name, value) => `Key '${name}': ${value}`;

export const valuesErrorMessage = messages =>
  `Object included invalid values(s): ${joinWithComma(messages)}`;

export const numberWithUnitErrorMessage = unit =>
  `Wasn't number with unit: '${unit}'`;

export const missingRequiredKeyErrorMessage = keys =>
  `Object was missing required key(s): [${quoteAndJoinWithComma(keys)}]`;

export const validNumberErrorMessage = always(`Wasn't a valid Number`);

export const orErrorMessages = joinWithAnd;
