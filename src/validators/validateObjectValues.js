import { validation as Validation } from 'folktale';
import { compose, reduce, toPairs, always, curry } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';

const { Success, Failure } = Validation;

const validate = (valueErrorMessage, validatorsMap) => (acc, [name, v]) => {
  const validator = validatorsMap[name];

  return isNotUndefined(validator)
    ? validator(v).matchWith({
        Success: always(acc),
        Failure: ({ value }) =>
          acc.concat(Failure([valueErrorMessage(name, value)])),
      })
    : acc;
};

export default curry(
  (objectValuesMessage, valueErrorMessage, validatorsMap) => o =>
    compose(
      reduce(validate(valueErrorMessage, validatorsMap), Success(o)),
      toPairs
    )(o).orElse(message => Failure([objectValuesMessage(message)]))
);
