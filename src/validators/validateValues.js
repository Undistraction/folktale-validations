import { validation as Validation } from 'folktale';
import { compose, reduce, toPairs } from 'ramda';
import { valueErrorMessage, valuesErrorMessage } from '../messages';

const { Success, Failure } = Validation;

const validate = validators => (acc, [name, v]) => {
  const validator = validators[name];
  return validator
    ? validator(v).matchWith({
        Success: _ => acc,
        Failure: ({ value }) =>
          acc.concat(Failure([valueErrorMessage(name, value)])),
      })
    : acc;
};

export default validators => o =>
  compose(reduce(validate(validators), Success(o)), toPairs)(o).orElse(
    message => Failure([valuesErrorMessage(message)])
  );
