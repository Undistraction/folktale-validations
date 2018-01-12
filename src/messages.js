import { always } from 'ramda';
import { joinWithComma } from './utils';
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

export const keysErrorMessage = invalidKeys =>
  `Object included invalid keys: '[${joinWithComma(invalidKeys)}]'`;

export const valueErrorMessage = (name, value) => `Key '${name}': ${value}`;

export const valuesErrorMessage = messages => `Object key(s) invalid: ${joinWithComma(messages)}`;

export const validNumberErrorMessage = always(`Wasn't a valid Number`);

export const orErrorMessages = joinWithAnd;
