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
import { buildTransformersMap } from './utils';

const { Success } = Validation;

const transformObjectValues = transformersMap =>
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
      toPairs(transformersMap)
    )
  );

export default compose(
  ifElse(isNotEmpty, transformObjectValues, always(Success)),
  buildTransformersMap
);
