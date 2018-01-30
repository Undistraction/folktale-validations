import { always } from 'ramda';
import {
  joinWithColon,
  joinWithOr,
  joinWithAnd,
  quote,
  tabsForLevel,
  joinWithSpace,
} from './utils';
import { ROOT_FIELD } from './const';

// -----------------------------------------------------------------------------
// Message Renderers
// -----------------------------------------------------------------------------

export const prefixWithKey = (level, s) =>
  joinWithSpace([`\n${tabsForLevel(level)} – Key`, s]);

export const prefixWithIndex = (level, index, s) =>
  joinWithSpace([`\n${tabsForLevel(level)} – [${index}]`, s]);

export const objectValueErrorMessage = (level, name) => value =>
  prefixWithKey(level, joinWithColon([quote(name), value]));

export const arrayValueErrorMessage = (level, index, value) =>
  prefixWithIndex(level, index, value);

export const invalidObjectPrefix = always(`Object`);
export const invalidArrayPrefix = always(`Array`);

export const invalidObjectReasonInvalidValues = always(
  `included invalid value(s)`
);
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

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

export const joinMessagesWithAnd = joinWithAnd;
export const joinMessagesWithOr = joinWithOr;
