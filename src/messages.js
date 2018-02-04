import { isNotNull, isArray } from 'ramda-adjunct';
import { always, curry, ifElse, when, compose, of } from 'ramda';
import { validation as Validation } from 'folktale';
import {
  joinWithColon,
  joinWithOr,
  joinWithAnd,
  wrapWithSingleQuotes,
  joinWithSpace,
  propValue,
  joinWithEmDash,
  wrapWithSquareBrackets,
  newlineAndTabsForLevel,
} from './utils';
import { ROOT_FIELD } from './const';
import { TYPES } from '../lib/const';

const { Failure } = Validation;

const KEY = `Key`;

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

export const joinMessagesWithAnd = joinWithAnd;
export const joinMessagesWithOr = joinWithOr;

export const wrapFailureMessageWith = messageWrapper =>
  compose(Failure, of, messageWrapper, propValue);

// -----------------------------------------------------------------------------
// Message Renderers
// -----------------------------------------------------------------------------

export const prefixWithKey = curry((level, value) =>
  joinWithSpace([joinWithEmDash([newlineAndTabsForLevel(level), KEY]), value])
);

export const prefixWithIndex = (level, index, value) =>
  joinWithSpace([
    joinWithEmDash([
      newlineAndTabsForLevel(level),
      wrapWithSquareBrackets(index),
    ]),
    value,
  ]);

export const objectValueErrorMessage = (level, name) => value => {
  const stringValue = when(isArray, joinWithAnd)(value);
  return ifElse(
    isNotNull,
    always(
      prefixWithKey(
        level,
        joinWithColon([wrapWithSingleQuotes(name), stringValue])
      )
    ),
    always(stringValue)
  )(name);
};

export const arrayValueErrorMessage = (level, index, value) =>
  prefixWithIndex(level, index, value);

export const fieldsErrorMessage = (level, value) =>
  joinWithEmDash([newlineAndTabsForLevel(level), value]);

export const invalidObjectPrefix = always(TYPES.Object);
export const invalidArrayPrefix = always(TYPES.Array);

export const invalidObjectReasonInvalidValues = level =>
  joinWithEmDash([newlineAndTabsForLevel(level), `included invalid value(s)`]);

export const invalidArrayReasonInvalidObjects = always(
  `included invalid object(s)`
);

// -----------------------------------------------------------------------------
// Constraint Validator Messages
// -----------------------------------------------------------------------------

export const constraintsObjName = always(`Constraints`);

export const objectValidatorErrorMessage = fieldName => messages =>
  fieldName === ROOT_FIELD
    ? joinWithColon([`Object Invalid`, messages])
    : `for field ${joinWithColon([wrapWithSingleQuotes(fieldName), messages])}`;

export const fieldErrorMessage = (field, errorMessage) =>
  `Field ${joinWithColon([wrapWithSingleQuotes(field), errorMessage])}`;

export const objectErrorMessageWrapper = fieldName =>
  wrapFailureMessageWith(objectValidatorErrorMessage(fieldName));
