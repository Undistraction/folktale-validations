import { validation as Validation } from 'folktale';
import { reduce } from 'ramda';

const { Success, Failure } = Validation;

export default validator => o => {
  const validation = reduce(
    (acc, value) =>
      Failure.hasInstance(acc) ? acc : acc.concat(validator(value)),
    Success()
  )(o);
  console.log(`Validation`, validation);
  return Success.hasInstance(validation) ? Success(o) : validation;
};
