import { validation as Validation } from 'folktale';
import { compose, reduce, toPairs, prop } from 'ramda';
import { valueErrorMessage, valuesErrorMessage } from '../messages';

const { Success, Failure } = Validation;

const validate = o => (acc, [name, validator]) =>
  validator(prop(name, o)).matchWith({
    Success: _ => acc,
    Failure: ({ value }) =>
      acc.concat(Failure([valueErrorMessage(name, value)])),
  });

export default validators => o =>
  compose(reduce(validate(o), Success(o)), toPairs)(validators).orElse(
    message => Failure([valuesErrorMessage(message)])
  );
