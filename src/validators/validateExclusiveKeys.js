import { validation as Validation } from 'folktale';
import { curry, flip, has, filter } from 'ramda';

const { Success, Failure } = Validation;

export default curry((message, exclusiveKeys) => o => {
  const collectExclusiveKeys = filter(flip(has)(o));
  const collectedExclusiveKeys = collectExclusiveKeys(exclusiveKeys);
  return collectedExclusiveKeys.length <= 1
    ? Success(o)
    : Failure([message(collectedExclusiveKeys)]);
});
