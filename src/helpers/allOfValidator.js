import { validation as Validation } from 'folktale';
import { compose, when, reduce, flip, append } from 'ramda';
import { isArray } from 'ramda-adjunct';
import { andErrorMessages } from '../messages';

const { Success, Failure } = Validation;

const toErr = compose(
  Failure,
  flip(append)([]),
  when(isArray, andErrorMessages)
);

export default validators => o =>
  reduce(
    (acc, validator) => acc.concat(validator(o)),
    Success(o),
    validators
  ).orElse(toErr);
