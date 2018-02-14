import { curry, inc, append, compose, cond, T, ifElse, when } from 'ramda'
import { isPlainObj, isNotUndefined } from 'ramda-adjunct'
import { reduceObjIndexed } from '../../utils/iteration'
import {
  propFields,
  propChildren,
  propFieldsFailureMessage,
  hasPropChildren,
  propName,
} from '../../utils/failures'
import { isAndOrOrObj, throwInvalidFailureStructureMessage } from '../utils'
import andOrRenderer from './andOrRenderer'
import { isPayload } from '../utils/payload'
import messageLookup from '../messageLookup'
import payloadRenderer from './payloadRenderer'

export default curry((rendererMessages, validatorMessages) => failureObj => {
  const {
    renderPayload,
    renderObjectFieldsError,
    // Render
    renderObject,
    renderArray,
    renderArrayValue,
  } = rendererMessages
  // ---------------------------------------------------------------------------
  // Configure
  // ---------------------------------------------------------------------------

  const renderPayloadConfigured = compose(payloadRenderer, messageLookup)(
    validatorMessages
  )
  const renderAndOrMessagesConfigured = andOrRenderer(
    renderPayloadConfigured,
    rendererMessages
  )
  const renderPayloadMessagesConfigured = renderPayload(renderPayloadConfigured)
  const renderObjectFieldsErrorMessageConfigured = renderObjectFieldsError(
    renderPayloadConfigured
  )

  // ---------------------------------------------------------------------------
  // Value
  // ---------------------------------------------------------------------------

  const processValue = (level, fieldValue, fieldName) =>
    cond([
      [isAndOrOrObj, renderAndOrMessagesConfigured],
      [isPayload, renderPayloadMessagesConfigured(level, fieldName)],
      // eslint-disable-next-line no-use-before-define
      [isPlainObj, processObjectOrArray(level, fieldName)],
      [T, throwInvalidFailureStructureMessage],
    ])(fieldValue)

  // ---------------------------------------------------------------------------
  // Array
  // ---------------------------------------------------------------------------

  const processArrayValues = level =>
    reduceObjIndexed((acc, [key, value]) => {
      const result = renderArrayValue(
        level,
        key,
        processValue(inc(level), value)
      )
      return append(result, acc)
    }, [])

  const processArray = (level, fieldName) =>
    compose(
      renderArray(level, fieldName),
      processArrayValues(inc(level)),
      propChildren
    )

  // ---------------------------------------------------------------------------
  // Object
  // ---------------------------------------------------------------------------

  const processObjectFields = (level, o) =>
    compose(
      reduceObjIndexed((acc, [fieldName, fieldValue]) => {
        const result = processValue(level, fieldValue, fieldName)
        return append(result, acc)
      }, []),
      propFields
    )(o)

  const processObjectFieldsErrorMessage = (level, o) =>
    compose(
      when(isNotUndefined, renderObjectFieldsErrorMessageConfigured(level)),
      propFieldsFailureMessage
    )(o)

  const processObject = (level, fieldName) => o =>
    renderObject(
      level,
      fieldName,
      propName(o),
      processObjectFields(level, o),
      processObjectFieldsErrorMessage(level, o)
    )

  // ---------------------------------------------------------------------------
  // Object or Array
  // ---------------------------------------------------------------------------

  const processObjectOrArray = (level, fieldName) =>
    ifElse(
      hasPropChildren,
      processArray(level, fieldName),
      processObject(level, fieldName)
    )

  return processValue(0, failureObj)
})
