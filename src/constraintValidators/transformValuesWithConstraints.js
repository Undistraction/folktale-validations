import {
  compose,
  reduce,
  assoc,
  prop,
  toPairs,
  ifElse,
  always,
  __,
} from 'ramda';
import { isNotEmpty } from 'ramda-adjunct';
import { validation as Validation } from 'folktale';
import { transformersMap } from './utils';

const { Success } = Validation;

const transformValues = transformers =>
  compose(
    Success,
    reduce(
      (acc, [name, transformer]) =>
        assoc(name, transformer(prop(name, acc)))(acc),
      __,
      toPairs(transformers)
    )
  );

export default constraints =>
  ifElse(isNotEmpty, transformValues, always(Success))(
    transformersMap(constraints)
  );
