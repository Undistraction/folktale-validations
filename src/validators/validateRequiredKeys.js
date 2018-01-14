import { validation as Validation } from 'folktale';
import { flip, has, reject, isEmpty } from 'ramda';
import { missingRequiredKeyErrorMessage } from '../messages';

const { Success, Failure } = Validation;

export default requiredKeys => o => {
  const collectInvalidKeys = reject(flip(has)(o));
  const invalidKeys = collectInvalidKeys(requiredKeys);
  return isEmpty(invalidKeys)
    ? Success(o)
    : Failure([missingRequiredKeyErrorMessage(invalidKeys)]);
};
