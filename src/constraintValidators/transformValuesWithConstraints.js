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
import { isNotEmpty, isUndefined } from 'ramda-adjunct';
import { validation as Validation } from 'folktale';
import { transformersMap } from './utils';

const { Success } = Validation;

const transformValues = transformers =>
  compose(
    Success,
    reduce(
      (acc, [name, transformer]) =>
        ifElse(
          isUndefined,
          always(acc),
          compose(assoc(name, __, acc), transformer)
        )(prop(name, acc)),
      __,
      toPairs(transformers)
    )
  );

export default constraints =>
  ifElse(isNotEmpty, transformValues, always(Success))(
    transformersMap(constraints)
  );
