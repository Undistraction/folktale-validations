import { compose, when, reduce, flip, append } from 'ramda';
import { isArray } from 'ramda-adjunct';

import { Success, Failure } from 'folktale/validation';
import { andErrorMessages } from '../messages';

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
