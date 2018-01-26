import { cond, curry } from 'ramda';
import { isString, isObj } from 'ramda-adjunct';
import {
  joinWithColon,
  reduceObjIndexed,
  joinWithNoSpace,
  joinWithSpace,
  quote,
} from '../../utils';
import {
  invalidObjectPrefix,
  invalidObjectReasonInvalidValues,
  objectValueErrorMessage,
  prefixWithKey,
} from '../../messages';

const buildObjMessage = curry((level, fieldName, fieldValue) =>
  prefixWithKey(
    level,
    joinWithSpace([
      joinWithColon([quote(fieldName), invalidObjectPrefix()]),
      invalidObjectReasonInvalidValues(),
      // eslint-disable-next-line no-use-before-define
      parseObj(level + 1)(fieldValue),
    ])
  )
);

const parseObj = level =>
  reduceObjIndexed(
    (acc, [fieldName, fieldValue]) => {
      const result = cond([
        [isString, objectValueErrorMessage(level, fieldName)],
        [isObj, buildObjMessage(level, fieldName)],
      ])(fieldValue);

      return joinWithNoSpace([acc, result]);
    },

    ``
  );

export default o =>
  joinWithNoSpace([
    joinWithSpace([invalidObjectPrefix(), invalidObjectReasonInvalidValues()]),
    parseObj(1)(o),
  ]);
