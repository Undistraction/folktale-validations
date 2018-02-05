import {
  curry,
  inc,
  append,
  compose,
  when,
  always,
  of,
  prepend,
  defaultTo,
  cond,
  T,
} from 'ramda'
import { isNotNull, isNotUndefined, concatRight } from 'ramda-adjunct'
import { isStringOrArray } from '../../utils/predicates'
import { reduceObjIndexed, mapWithIndex } from '../../utils/iteration'
import {
  propName,
  propFields,
  propChildren,
  propFieldsFailiureMessage,
  hasPropChildren,
} from '../../utils/failures'
import {
  joinWithColon,
  joinWithNoSpace,
  joinWithSpace,
  wrapWithSingleQuotes,
} from '../../utils/formatting'
import { isAndOrOrObj } from '../utils'
import andOrRenderer from './andOrRenderer'

export default messages => failureObj => {
  const buildArrayMessage = curry((level, fieldName, fieldValue) => {
    const prefix = compose(
      joinWithColon,
      append(messages.invalidArrayPrefix()),
      of,
      wrapWithSingleQuotes,
      defaultTo(``)
    )(fieldName)

    const result = joinWithSpace([
      prefix,
      messages.invalidArrayReasonInvalidObjects(),
      // eslint-disable-next-line no-use-before-define
      joinWithNoSpace(parseArray(inc(level))(fieldValue)),
    ])
    return isNotUndefined(fieldName)
      ? messages.prefixWithKey(level, result)
      : result
  })

  const buildObjMessage = curry((level, fieldName, o) => {
    if (hasPropChildren(o)) {
      return buildArrayMessage(level, fieldName, propChildren(o))
    }

    const fields = propFields(o)
    const fieldsError = propFieldsFailiureMessage(o)

    return compose(
      when(always(isNotNull(fieldName)), messages.prefixWithKey(level)),
      joinWithSpace,
      when(
        always(isNotUndefined(fields)),
        concatRight([
          messages.invalidObjectReasonInvalidValues(level),
          // eslint-disable-next-line no-use-before-define
          parseFields(level)(fields),
        ])
      ),
      when(
        always(isNotUndefined(fieldsError)),
        append(messages.fieldsErrorMessage(level, fieldsError))
      ),
      of,
      when(
        always(isNotNull(fieldName)),
        compose(joinWithColon, prepend(wrapWithSingleQuotes(fieldName)), of)
      )
    )(defaultTo(messages.invalidObjectPrefix(), propName(o)))
  })

  const parseFieldValue = (level, fieldValue, fieldName = null) =>
    cond([
      [isAndOrOrObj, andOrRenderer(messages)],
      [isStringOrArray, messages.objectValueErrorMessage(level, fieldName)],
      [T, buildObjMessage(level, fieldName)],
    ])(fieldValue)

  const fieldsReducer = level => (acc, [fieldName, fieldValue]) => {
    const result = parseFieldValue(level, fieldValue, fieldName)
    return joinWithNoSpace([acc, result])
  }

  const parseFields = level => reduceObjIndexed(fieldsReducer(level), ``)

  const parseArray = level =>
    mapWithIndex((o, index) =>
      messages.arrayValueErrorMessage(
        level,
        index,
        parseFieldValue(inc(level), o)
      )
    )

  return parseFieldValue(0, failureObj)
}
