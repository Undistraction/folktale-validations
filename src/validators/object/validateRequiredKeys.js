import { validation as Validation } from 'folktale';
import {
  compose,
  flip,
  has,
  reject,
  isEmpty,
  curry,
  ifElse,
  always,
  of,
} from 'ramda';

const { Success, Failure } = Validation;

export default curry((message, requiredKeys) => o => {
  const collectInvalidKeys = reject(flip(has)(o));
  const invalidKeys = collectInvalidKeys(requiredKeys);
  return ifElse(isEmpty, always(Success(o)), compose(Failure, of, message))(
    invalidKeys
  );
});
