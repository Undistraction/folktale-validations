import { identity, toPairs, reduce, compose, prop, assoc } from 'ramda';
import { validation as Validation } from 'folktale';
import validateValues from '../validators/validateValues';
import { validatorsMap, transformersMap } from './utils';

const { Success } = Validation;

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

export default constraints => o =>
  validateValues(validatorsMap(constraints))(o).matchWith({
    Success: ({ value }) => {
      const result = transformValues(transformersMap(constraints))(value);
      return result;
    },
    Failure: identity,
  });
