import {
  curry,
  without,
  compose,
  keys,
  isEmpty,
  always,
  ifElse,
  of,
} from 'ramda';
import { validation as Validation } from 'folktale';

const { Success, Failure } = Validation;

export default curry((message, validKeys) => o =>
  ifElse(isEmpty, always(Success(o)), compose(Failure, of, message))(
    compose(without(validKeys), keys)(o)
  )
);
