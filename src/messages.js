import { always } from 'ramda';
import {
  joinWithComma,
  joinWithColon,
  joinWithOr,
  joinWithAnd,
  quoteAndJoinWithComma,
  quote,
  wrapSB,
} from './utils';
import { ROOT_FIELD } from './const';

const prefixForTypeErrorMessage = complement =>
  complement ? `Was type` : `Wasn't type`;

export const fieldErrorMessage = (field, errorMessage) =>
  `Field ${joinWithColon([quote(field), errorMessage])}`;

export const typeErrorMessage = (typeName, complement = false) =>
  joinWithColon([prefixForTypeErrorMessage(complement), quote(typeName)]);

export const arrayElementErrorMessage = (value, message) =>
  joinWithColon([quote(value), message]);

export const arrayElementsErrorMessage = elementErrorMessages =>
  joinWithColon([
    `Array contained invalid element(s)`,
    joinWithComma(elementErrorMessages),
  ]);

export const whitelistErrorMessage = whitelist =>
  joinWithColon([
    `Value wasn't one of the accepted values`,
    joinWithComma(whitelist),
  ]);

export const invalidKeysErrorMessage = invalidKeys =>
  joinWithColon([
    `Object included invalid key(s)`,
    quote(wrapSB(joinWithComma(invalidKeys))),
  ]);

export const valueErrorMessage = name => value =>
  `Key ${joinWithColon([quote(name), value])}`;

export const valuesErrorMessage = messages =>
  joinWithColon([`Object included invalid values(s)`, joinWithComma(messages)]);

export const numberWithUnitErrorMessage = unit =>
  joinWithColon([`Wasn't number with unit`, quote(unit)]);

export const missingRequiredKeyErrorMessage = keys =>
  joinWithColon([
    `Object was missing required key(s)`,
    wrapSB(quoteAndJoinWithComma(keys)),
  ]);

export const lengthGreaterThanErrorMessage = length =>
  `Length must be greater than ${length}`;

export const lengthLessThanErrorMessage = length =>
  `Length must be less than ${length}`;

export const constraintValidatorErrorMessage = messages =>
  `Constraints ${messages}`;

export const objectValidatorErrorMessage = fieldName => messages =>
  fieldName === ROOT_FIELD
    ? joinWithColon([`Object Invalid`, messages])
    : `for field ${joinWithColon([quote(fieldName), messages])}`;

export const exclusiveKeyErrorMessage = keys =>
  joinWithColon([
    `Object had more than one exlusive key`,
    wrapSB(quoteAndJoinWithComma(keys)),
  ]);

export const isEmptyErrorMessage = always(`Was Empty`);

export const validNumberErrorMessage = always(`Wasn't a valid Number`);

export const andErrorMessages = joinWithAnd;

export const orErrorMessages = joinWithOr;
