import { validation as Validation } from 'folktale';
import { reduce } from 'ramda';

const { Success, Failure } = Validation;

export default validator => o => {
  const validation = reduce(
    (acc, value) =>
      Failure.hasInstance(acc) ? acc : acc.concat(validator(value)),
    Success()
  )(o);
  return Success.hasInstance(validation) ? Success(o) : validation;
};
