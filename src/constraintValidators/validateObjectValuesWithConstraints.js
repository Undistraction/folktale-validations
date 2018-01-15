import { identity, toPairs, reduce, compose, prop, assoc } from 'ramda';
import { validation as Validation } from 'folktale';
import { valueErrorMessage, valuesErrorMessage } from '../messages';
import { validatorsMap, transformersMap } from './utils';

const { Success, Failure } = Validation;

const transformValues = transformers => o =>
  compose(
    Success,
    reduce(
      (acc, [name, transformer]) =>
        assoc(name, transformer(prop(name, o)))(acc),
      o
    ),
    toPairs
  )(transformers);

const validate = constraints => (acc, [name, v]) => {
  const valMap = validatorsMap(constraints);
  const validator = valMap[name];
  return validator
    ? validator(v).matchWith({
        Success: _ => acc,
        Failure: ({ value }) =>
          acc.concat(Failure([valueErrorMessage(name, value)])),
      })
    : acc;
};

const validateValues = valMap => o =>
  compose(reduce(validate(valMap), Success(o)), toPairs)(o).orElse(message =>
    Failure([valuesErrorMessage(message)])
  );

export default constraints => o =>
  validateValues(constraints)(o).matchWith({
    Success: ({ value }) => {
      const result = transformValues(transformersMap(constraints))(value);
      return result;
    },
    Failure: identity,
  });
