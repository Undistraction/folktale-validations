import { map, join, prop, find } from 'ramda';
import { validation as Validation } from 'folktale';

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
  const message = join(` and `, map(prop(`value`), validations));
  return Failure(message);
};
