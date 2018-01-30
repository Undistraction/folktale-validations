import { curry, without, compose, keys, isEmpty } from 'ramda';
import { validation as Validation } from 'folktale';

const { Success, Failure } = Validation;

export default curry((message, validKeys) => o => {
  const collectInvalidKeys = compose(without(validKeys), keys);
  const invalidKeys = collectInvalidKeys(o);
  return isEmpty(invalidKeys) ? Success(o) : Failure([message(invalidKeys)]);
});
