import { without, compose, keys, isEmpty } from 'ramda';
import { validation as Validation } from 'folktale';
import { invalidKeysErrorMessage } from '../messages';

const { Success, Failure } = Validation;

export default validKeys => o => {
  const collectInvalidKeys = compose(without(validKeys), keys);
  const invalidKeys = collectInvalidKeys(o);
  return isEmpty(invalidKeys)
    ? Success(o)
    : Failure([invalidKeysErrorMessage(invalidKeys)]);
};
