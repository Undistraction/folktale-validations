import { validation as Validation } from 'folktale';
import { flip, has, reject, isEmpty, curry } from 'ramda';

const { Success, Failure } = Validation;

export default curry((message, requiredKeys) => o => {
  const collectInvalidKeys = reject(flip(has)(o));
  const invalidKeys = collectInvalidKeys(requiredKeys);
  return isEmpty(invalidKeys) ? Success(o) : Failure([message(invalidKeys)]);
});
