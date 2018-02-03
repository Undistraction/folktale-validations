import { has, prop, filter } from 'ramda';
import { isNotFunction, isNotEmpty } from 'ramda-adjunct';
import {
  noMessageForKeyErrorMessage,
  messageValueMustBeFunction,
  throwError,
} from '../errors';

export default messages => {
  const invalid = filter(isNotFunction)(messages);

  if (isNotEmpty(invalid)) {
    throwError(messageValueMustBeFunction(invalid));
  }

  return key => {
    if (has(key, messages)) {
      return prop(key, messages);
    }
    return throwError(noMessageForKeyErrorMessage(key));
  };
};
