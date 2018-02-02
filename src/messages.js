import { isNotNull, isNotString, isArray } from 'ramda-adjunct';
import { always, curry, ifElse, when } from 'ramda';
import {
  joinWithColon,
  joinWithOr,
  joinWithAnd,
  quote,
  tabsForLevel,
  joinWithSpace,
} from './utils';
import { ROOT_FIELD } from './const';
import wrapFailureMessageWith from './utils/wrapFailureMessageWith';

// -----------------------------------------------------------------------------
// Message Renderers
// -----------------------------------------------------------------------------

export const prefixWithKey = curry((level, s) =>
  joinWithSpace([`\n${tabsForLevel(level)} – Key`, s])
);

export const prefixWithIndex = (level, index, s) =>
  joinWithSpace([`\n${tabsForLevel(level)} – [${index}]`, s]);

export const objectValueErrorMessage = (level, name) => value => {
  const s = when(isArray, joinWithAnd)(value);
  return ifElse(
    isNotNull,
    _ => prefixWithKey(level, joinWithColon([quote(name), s])),
    always(s)
  )(name);
};

export const arrayValueErrorMessage = (level, index, value) =>
  prefixWithIndex(level, index, value);

export const fieldsErrorMessage = (level, value) =>
  `\n${tabsForLevel(level)} – ${value}`;

export const invalidObjectPrefix = always(`Object`);
export const invalidArrayPrefix = always(`Array`);

export const invalidObjectReasonInvalidValues = level =>
  `\n${tabsForLevel(level)} – included invalid value(s)`;

export const invalidArrayReasonInvalidObjects = always(
  `included invalid object(s)`
);

// -----------------------------------------------------------------------------
// Constraint Validator Messages
// -----------------------------------------------------------------------------

export const objectValidatorErrorMessage = fieldName => messages =>
  fieldName === ROOT_FIELD
    ? joinWithColon([`Object Invalid`, messages])
    : `for field ${joinWithColon([quote(fieldName), messages])}`;

export const fieldErrorMessage = (field, errorMessage) =>
  `Field ${joinWithColon([quote(field), errorMessage])}`;

export const constraintValidatorErrorMessage = messages =>
  `Constraints ${messages}`;

export const objectErrorMessageWrapper = fieldName =>
  wrapFailureMessageWith(objectValidatorErrorMessage(fieldName));

export const constraintErrorMessageWrapper = wrapFailureMessageWith(
  constraintValidatorErrorMessage
);

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

export const joinMessagesWithAnd = joinWithAnd;
export const joinMessagesWithOr = joinWithOr;
