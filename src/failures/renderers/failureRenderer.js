import {
  always,
  curry,
  inc,
  append,
  compose,
  cond,
  T,
  ifElse,
  when,
} from 'ramda'
import { isPlainObj, isNotUndefined } from 'ramda-adjunct'
import { reduceObjIndexed } from '../../utils/iteration'
import {
  propFields,
  propChildren,
  propFieldsFailureMessage,
  hasPropChildren,
  propName,
  isAndOrOrObj,
} from '../../utils/failures'
import { throwInvalidFailureStructureMessage } from '../../errors'
import { isPayload } from '../../utils/payload'
import andOrRenderer from './andOrRenderer'
import messageLookup from '../messageLookup'
import payloadRenderer from './payloadRenderer'

export default curry((rendererHelpers, validatorMessages) => failureObj => {
  const {
    renderPayload,
    renderObjectFieldsError,
    renderObject,
    renderArray,
    renderArrayValue,
    prefixWithKey,
  } = rendererHelpers
  // ---------------------------------------------------------------------------
  // Configure
  // ---------------------------------------------------------------------------

  const renderPayloadConfigured = compose(payloadRenderer, messageLookup)(
    validatorMessages
  )
  const renderAndOrMessagesConfigured = andOrRenderer(
    renderPayloadConfigured,
    rendererHelpers
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
      [
        isAndOrOrObj,
        compose(
          when(
            always(isNotUndefined(fieldName)),
            prefixWithKey(level, fieldName)
          ),
          renderAndOrMessagesConfigured
        ),
      ],
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
