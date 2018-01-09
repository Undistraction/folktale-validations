import { map, prop, find } from 'ramda';
import { validation as Validation } from 'folktale';
import { joinWithAnd } from '../utils';

const { Success, Failure } = Validation;

export default validators => o => {
  const validations = map(validator => validator(o), validators);
  const success = find(
    validation => Success.hasInstance(validation),
    validations
  );
  if (success) {
    return Success(o);
  }
  const message = joinWithAnd(map(prop(`value`), validations));
  return Failure(message);
};
