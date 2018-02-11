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
import {
  isNotNull,
  isNotUndefined,
  concatRight,
  isPlainObj,
} from 'ramda-adjunct'
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
import { isPayload } from '../utils/payload'
import messageLookup from '../messageLookup'
import payloadRenderer from './payloadRenderer'
import { throwError, invalidFailureStructureErrorMessage } from '../../errors'

export default curry((rendererMessages, validatorMessages) => failureObj => {
  const renderPayload = compose(payloadRenderer, messageLookup)(
    validatorMessages
  )
  const renderAndOrMessage = andOrRenderer(renderPayload, rendererMessages)
  const renderMessageFromPayload = rendererMessages.errorMessageFromPayload(
    renderPayload
  )
  const renderFieldsErrorMessage = rendererMessages.fieldsErrorMessage(
    renderPayload
  )

  const buildArrayMessage = curry((level, fieldName, fieldValue) => {
    const prefix = compose(
      joinWithColon,
      append(rendererMessages.invalidArrayPrefix()),
      of,
      wrapWithSingleQuotes,
      defaultTo(``)
    )(fieldName)

    const result = joinWithSpace([
      prefix,
      rendererMessages.invalidArrayReasonInvalidObjects(),
      // eslint-disable-next-line no-use-before-define
      joinWithNoSpace(parseArray(inc(level))(fieldValue)),
    ])
    return isNotUndefined(fieldName)
      ? rendererMessages.prefixWithObjectKey(level, result)
      : result
  })

  const buildObjMessage = curry((level, fieldName, o) => {
    if (hasPropChildren(o)) {
      return buildArrayMessage(level, fieldName, propChildren(o))
    }

    const fields = propFields(o)
    const fieldsPayload = propFieldsFailiureMessage(o)
    return compose(
      when(
        always(isNotNull(fieldName)),
        rendererMessages.prefixWithObjectKey(level)
      ),
      joinWithSpace,
      when(
        always(isNotUndefined(fields)),
        concatRight([
          rendererMessages.invalidObjectReasonInvalidValues(level),
          // eslint-disable-next-line no-use-before-define
          parseFields(level)(fields),
        ])
      ),
      when(always(isNotUndefined(fieldsPayload)), v =>
        append(renderFieldsErrorMessage(level, fieldsPayload))(v)
      ),
      of,
      when(
        always(isNotNull(fieldName)),
        compose(joinWithColon, prepend(wrapWithSingleQuotes(fieldName)), of)
      )
    )(defaultTo(rendererMessages.invalidObjectPrefix(), propName(o)))
  })

  const parseFieldValue = (level, fieldValue, fieldName = null) =>
    cond([
      [isAndOrOrObj, renderAndOrMessage],
      [isPayload, renderMessageFromPayload(level, fieldName)],
      [isPlainObj, buildObjMessage(level, fieldName)],
      [T, compose(throwError, invalidFailureStructureErrorMessage)],
    ])(fieldValue)

  const fieldsReducer = level => (acc, [fieldName, fieldValue]) => {
    const result = parseFieldValue(level, fieldValue, fieldName)
    return joinWithNoSpace([acc, result])
  }

  const parseFields = level => reduceObjIndexed(fieldsReducer(level), ``)

  const parseArray = level =>
    mapWithIndex((o, index) =>
      rendererMessages.arrayValueErrorMessage(
        level,
        index,
        parseFieldValue(inc(level), o)
      )
    )

  return parseFieldValue(0, failureObj)
})
