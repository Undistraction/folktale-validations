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

const cannotParse = compose(throwError, invalidFailureStructureErrorMessage)

export default curry((rendererMessages, validatorMessages) => failureObj => {
  // ---------------------------------------------------------------------------
  // Configure
  // ---------------------------------------------------------------------------

  const renderPayload = compose(payloadRenderer, messageLookup)(
    validatorMessages
  )
  const renderAndOrMessage = andOrRenderer(renderPayload, rendererMessages)
  const renderPayloadMessage = rendererMessages.payloadErrorMessage(
    renderPayload
  )
  const renderObjectFieldsErrorMessage = rendererMessages.fieldsErrorMessage(
    renderPayload
  )

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const renderValue = (level, fieldValue, fieldName = null) =>
    cond([
      [isAndOrOrObj, renderAndOrMessage],
      [isPayload, renderPayloadMessage(level, fieldName)],
      // eslint-disable-next-line no-use-before-define
      [isPlainObj, renderObject(level, fieldName)],
      [T, cannotParse],
    ])(fieldValue)

  // ---------------------------------------------------------------------------
  // Render Array
  // ---------------------------------------------------------------------------

  const renderArrayValues = level =>
    mapWithIndex((o, index) =>
      rendererMessages.arrayValueErrorMessage(
        level,
        index,
        renderValue(inc(level), o)
      )
    )

  const renderArray = curry((level, fieldName, fieldValue) => {
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
      joinWithNoSpace(renderArrayValues(inc(level))(fieldValue)),
    ])
    return isNotUndefined(fieldName)
      ? rendererMessages.prefixWithObjectKey(level, result)
      : result
  })

  // ---------------------------------------------------------------------------
  // Render Object
  // ---------------------------------------------------------------------------

  const renderObjectFields = level =>
    reduceObjIndexed((acc, [fieldName, fieldValue]) => {
      const result = renderValue(level, fieldValue, fieldName)
      return joinWithNoSpace([acc, result])
    }, ``)

  const renderObject = curry((level, fieldName, o) => {
    if (hasPropChildren(o)) {
      return renderArray(level, fieldName, propChildren(o))
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
          renderObjectFields(level)(fields),
        ])
      ),
      when(always(isNotUndefined(fieldsPayload)), v =>
        append(renderObjectFieldsErrorMessage(level, fieldsPayload))(v)
      ),
      of,
      when(
        always(isNotNull(fieldName)),
        compose(joinWithColon, prepend(wrapWithSingleQuotes(fieldName)), of)
      )
    )(defaultTo(rendererMessages.invalidObjectPrefix(), propName(o)))
  })

  return renderValue(0, failureObj)
})
