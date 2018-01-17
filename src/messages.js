import { always } from 'ramda';
import {
  joinWithComma,
  joinWithOr,
  joinWithAnd,
  quoteAndJoinWithComma,
  joinWitColon,
  quote,
} from './utils';

const prefixForTypeErrorMessage = complement =>
  complement ? `Was type` : `Wasn't type`;

export const fieldErrorMessage = (field, errorMessage) =>
  `Field '${field}': ${errorMessage}`;

export const typeErrorMessage = (typeName, complement = false) =>
  joinWitColon([prefixForTypeErrorMessage(complement), quote(typeName)]);

export const arrayElementErrorMessage = (value, message) =>
  `'${value}': ${message}`;

export const arrayElementsErrorMessage = elementErrorMessages =>
  `Array contained invalid element(s): ${elementErrorMessages}`;

export const whitelistErrorMessage = whitelist =>
  `Value wasn't one of the accepted values: ${joinWithComma(whitelist)}`;

export const invalidKeysErrorMessage = invalidKeys =>
  `Object included invalid key(s): '[${joinWithComma(invalidKeys)}]'`;

export const valueErrorMessage = name => value =>
  `Key ${quote(name)}: ${value}`;

export const valuesErrorMessage = messages =>
  `Object included invalid values(s): ${joinWithComma(messages)}`;

export const numberWithUnitErrorMessage = unit =>
  `Wasn't number with unit: ${quote(unit)}`;

export const missingRequiredKeyErrorMessage = keys =>
  `Object was missing required key(s): [${quoteAndJoinWithComma(keys)}]`;

export const lengthGreaterThanErrorMessage = length =>
  `Length must be greater than ${length}`;

export const lengthLessThanErrorMessage = length =>
  `Length must be less than ${length}`;

export const isEmptyErrorMessage = always(`Was Empty`);

export const validNumberErrorMessage = always(`Wasn't a valid Number`);

export const andErrorMessages = joinWithAnd;
export const orErrorMessages = joinWithOr;
