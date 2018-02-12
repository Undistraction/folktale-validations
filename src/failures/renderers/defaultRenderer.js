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
  ifElse,
} from 'ramda'
import { isNotUndefined, concatRight, isPlainObj } from 'ramda-adjunct'
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
  const {
    invalidArrayPrefix,
    payloadErrorMessage,
    fieldsErrorMessage,
    arrayValueErrorMessage,
    prefixWithObjectKey,
    invalidObjectPrefix,
    invalidObjectReasonInvalidValues,
    invalidArrayReasonInvalidObjects,
  } = rendererMessages
  // ---------------------------------------------------------------------------
  // Configure
  // ---------------------------------------------------------------------------

  const renderPayload = compose(payloadRenderer, messageLookup)(
    validatorMessages
  )
  const renderAndOrMessage = andOrRenderer(renderPayload, rendererMessages)
  const renderPayloadMessage = payloadErrorMessage(renderPayload)
  const renderObjectFieldsErrorMessage = fieldsErrorMessage(renderPayload)

  // ---------------------------------------------------------------------------
  // Value
  // ---------------------------------------------------------------------------

  const renderValue = (level, fieldValue, fieldName) =>
    cond([
      [isAndOrOrObj, renderAndOrMessage],
      [isPayload, renderPayloadMessage(level, fieldName)],
      // eslint-disable-next-line no-use-before-define
      [isPlainObj, renderObjectOrArray(level, fieldName)],
      [T, cannotParse],
    ])(fieldValue)

  // ---------------------------------------------------------------------------
  // Array
  // ---------------------------------------------------------------------------

  const renderArrayValues = level =>
    mapWithIndex((o, index) =>
      arrayValueErrorMessage(level, index, renderValue(inc(level), o))
    )

  const renderArray = (level, fieldName) => o => {
    const result = joinWithSpace([
      invalidArrayPrefix(fieldName),
      invalidArrayReasonInvalidObjects(),
      joinWithNoSpace(renderArrayValues(inc(level))(o)),
    ])
    return isNotUndefined(fieldName)
      ? prefixWithObjectKey(level, result)
      : result
  }

  // ---------------------------------------------------------------------------
  // Object
  // ---------------------------------------------------------------------------

  const renderObjectFields = level =>
    reduceObjIndexed((acc, [fieldName, fieldValue]) => {
      const result = renderValue(level, fieldValue, fieldName)
      return joinWithNoSpace([acc, result])
    }, ``)

  const renderObject = (level, fieldName) => o => {
    const fields = propFields(o)
    const fieldsPayload = propFieldsFailiureMessage(o)
    return compose(
      when(always(isNotUndefined(fieldName)), prefixWithObjectKey(level)),
      joinWithSpace,
      when(
        always(isNotUndefined(fields)),
        concatRight([
          invalidObjectReasonInvalidValues(level),
          renderObjectFields(level)(fields),
        ])
      ),
      when(always(isNotUndefined(fieldsPayload)), v =>
        append(renderObjectFieldsErrorMessage(level, fieldsPayload))(v)
      ),
      of,
      when(
        always(isNotUndefined(fieldName)),
        compose(joinWithColon, prepend(wrapWithSingleQuotes(fieldName)), of)
      )
    )(defaultTo(invalidObjectPrefix(), propName(o)))
  }

  // ---------------------------------------------------------------------------
  // Object or Array
  // ---------------------------------------------------------------------------

  const renderObjectOrArray = (level, fieldName) =>
    ifElse(
      hasPropChildren,
      compose(renderArray(level, fieldName), propChildren),
      renderObject(level, fieldName)
    )

  return renderValue(0, failureObj)
})
