import { validation as Validation } from 'folktale';
import { compose, when, reduce } from 'ramda';
import { isArray } from 'ramda-adjunct';
import { joinMessagesWithAnd } from '../messages';
import { appendRight } from '../utils';

const { Success, Failure } = Validation;

const toErr = compose(
  Failure,
  appendRight([]),
  when(isArray, joinMessagesWithAnd)
);

export default validators => o =>
  reduce(
    (acc, validator) => acc.concat(validator(o)),
    Success(o),
    validators
  ).orElse(toErr);
