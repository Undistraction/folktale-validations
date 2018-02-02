import {
  curry,
  inc,
  prop,
  append,
  either,
  ifElse,
  compose,
  when,
  always,
  of,
  prepend,
} from 'ramda';
import {
  isString,
  isArray,
  isNotNull,
  isNotUndefined,
  concatRight,
} from 'ramda-adjunct';
import {
  joinWithColon,
  reduceObjIndexed,
  joinWithNoSpace,
  joinWithSpace,
  quote,
  mapWithIndex,
  propFields,
  propChildren,
  hasPropChildren,
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

const buildArrayMessage = curry((level, fieldName, fieldValue) => {
  const hasFieldName = isNotNull(fieldName);

  const prefix = when(
    always(isNotNull(fieldName)),
    compose(joinWithColon, prepend(quote(fieldName)), of)
  )(invalidArrayPrefix());

  const result = joinWithSpace([
    prefix,
    invalidArrayReasonInvalidObjects(),
    // eslint-disable-next-line no-use-before-define
    joinWithNoSpace(parseArray(inc(level))(fieldValue)),
  ]);
  return hasFieldName ? prefixWithKey(level, result) : result;
});

const buildObjMessage = curry((level, fieldName, o) => {
  const hasChildren = hasPropChildren(o);
  if (hasChildren) {
    return buildArrayMessage(level, fieldName, propChildren(o));
  }

  const fields = propFields(o);
  const fieldsError = prop(`fieldsError`, o);

  return compose(
    when(always(isNotNull(fieldName)), prefixWithKey(level)),
    joinWithSpace,
    when(
      always(isNotUndefined(fields)),
      concatRight([
        invalidObjectReasonInvalidValues(level),
        // eslint-disable-next-line no-use-before-define
        parseFields(level)(fields),
      ])
    ),
    when(
      always(isNotUndefined(fieldsError)),
      append(fieldsErrorMessage(level, fieldsError))
    ),
    of,
    when(
      always(isNotNull(fieldName)),
      compose(joinWithColon, prepend(quote(fieldName)), of)
    )
  )(invalidObjectPrefix());
});

const parseFieldValue = (level, fieldName, fieldValue) =>
  ifElse(
    either(isString, isArray),
    objectValueErrorMessage(level, fieldName),
    buildObjMessage(level, fieldName)
  )(fieldValue);

const fieldsReducer = level => (acc, [fieldName, fieldValue]) => {
  const result = parseFieldValue(level, fieldName, fieldValue);
  return joinWithNoSpace([acc, result]);
};

const parseFields = level => reduceObjIndexed(fieldsReducer(level), ``);

const parseArray = level =>
  mapWithIndex((o, index) =>
    arrayValueErrorMessage(level, index, parseFieldValue(inc(level), null, o))
  );

export default o => parseFieldValue(0, null, o);
