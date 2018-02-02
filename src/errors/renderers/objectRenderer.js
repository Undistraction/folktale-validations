import { cond, curry, inc, prop, append, concat } from 'ramda';
import { isString, isPlainObj, isArray, isNotNull } from 'ramda-adjunct';
import {
  joinWithColon,
  reduceObjIndexed,
  joinWithNoSpace,
  joinWithSpace,
  quote,
  mapWithIndex,
  propFields,
} from '../../utils';
import {
  invalidObjectPrefix,
  invalidObjectReasonInvalidValues,
  objectValueErrorMessage,
  prefixWithKey,
  invalidArrayPrefix,
  arrayValueErrorMessage,
  invalidArrayReasonInvalidObjects,
  fieldsErrorMessage,
} from '../../messages';

const buildObjMessage = curry((level, fieldName, o) => {
  const hasFieldName = isNotNull(fieldName);
  const fields = propFields(o);
  const fieldsError = prop(`fieldsError`, o);

  // Different formatting if root or field
  const prefix = hasFieldName
    ? joinWithColon([quote(fieldName), invalidObjectPrefix()])
    : invalidObjectPrefix();

  let a = [prefix];
  if (fieldsError) {
    a = append(fieldsErrorMessage(level, fieldsError), a);
  }
  if (fields) {
    a = concat(a, [
      invalidObjectReasonInvalidValues(level),
      // eslint-disable-next-line no-use-before-define
      parseObj(inc(level))(o),
    ]);
  }
  const result = joinWithSpace(a);
  return hasFieldName ? prefixWithKey(level, result) : result;
});

const buildArrayMessage = curry((level, fieldName, fieldValue) => {
  const hasFieldName = isNotNull(fieldName);
  // Different formatting if root or field
  const prefix = hasFieldName
    ? joinWithColon([quote(fieldName), invalidArrayPrefix()])
    : invalidArrayPrefix();

  const result = joinWithSpace([
    prefix,
    invalidArrayReasonInvalidObjects(),
    // eslint-disable-next-line no-use-before-define
    joinWithNoSpace(parseArray(inc(level))(fieldValue)),
  ]);
  return hasFieldName ? prefixWithKey(level, result) : result;
});

const parseFieldValue = (level, fieldName, fieldValue) =>
  cond([
    [isString, objectValueErrorMessage(level, fieldName)],
    [isPlainObj, buildObjMessage(level, fieldName)],
    [isArray, buildArrayMessage(level, fieldName)],
  ])(fieldValue);

const parseObj = level => o => {
  const fields = propFields(o);

  return reduceObjIndexed((acc, [fieldName, fieldValue]) => {
    const result = parseFieldValue(level, fieldName, fieldValue);
    return joinWithNoSpace([acc, result]);
  }, ``)(fields);
};

const parseArray = level =>
  mapWithIndex((o, index) =>
    arrayValueErrorMessage(level, index, parseFieldValue(level, null, o))
  );

export default o => parseFieldValue(0, null, o);
