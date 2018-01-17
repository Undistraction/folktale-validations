import { validation as Validation } from 'folktale';
import { flip, has, filter } from 'ramda';
import { exclusiveKeyErrorMessage } from '../messages';

const { Success, Failure } = Validation;

export default exclusiveKeys => o => {
  const collectExclusiveKeys = filter(flip(has)(o));
  const collectedExclusiveKeys = collectExclusiveKeys(exclusiveKeys);
  return collectedExclusiveKeys.length <= 1
    ? Success(o)
    : Failure([exclusiveKeyErrorMessage(collectedExclusiveKeys)]);
};
