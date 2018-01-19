import { validation as Validation } from 'folktale';
import { compose, reduce, toPairs, always } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { valueErrorMessage, valuesErrorMessage } from '../messages';

const { Success, Failure } = Validation;

const validate = validatorsMap => (acc, [name, v]) => {
  const validator = validatorsMap[name];

  return isNotUndefined(validator)
    ? validator(v).matchWith({
        Success: always(acc),
        Failure: ({ value }) =>
          acc.concat(Failure([valueErrorMessage(name)(value)])),
      })
    : acc;
};

export default validatorsMap => o =>
  compose(reduce(validate(validatorsMap), Success(o)), toPairs)(o).orElse(
    message => Failure([valuesErrorMessage(message)])
  );
