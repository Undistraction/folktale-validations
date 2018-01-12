import { validation as Validation } from 'folktale';
import { compose, reduce, toPairs, prop } from 'ramda';
import { valueErrorMessage, valuesErrorMessage } from '../messages';

const { Success, Failure } = Validation;

const getValidator = validators => (acc, [keyName, keyValue]) => {
  const validator = prop(keyName, validators);
  return validator
    ? validator(keyValue).matchWith({
        Success: _ => acc,
        Failure: ({ value }) =>
          acc.concat(Failure([valueErrorMessage(keyName, value)])),
      })
    : acc;
};

export default validators => o =>
  compose(reduce(getValidator(validators), Success(o)), toPairs)(o).orElse(
    message => Failure([valuesErrorMessage(message)])
  );
