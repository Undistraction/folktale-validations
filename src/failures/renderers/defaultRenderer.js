import { curry, inc, append, compose, cond, T, ifElse, when } from 'ramda'
import { isPlainObj, isNotUndefined } from 'ramda-adjunct'
import { reduceObjIndexed, mapWithIndex } from '../../utils/iteration'
import {
  propFields,
  propChildren,
  propFieldsFailiureMessage,
  hasPropChildren,
  propName,
} from '../../utils/failures'
import { isAndOrOrObj } from '../utils'
import andOrRenderer from './andOrRenderer'
import { isPayload } from '../utils/payload'
import messageLookup from '../messageLookup'
import payloadRenderer from './payloadRenderer'
import { throwError, invalidFailureStructureErrorMessage } from '../../errors'

const cannotParse = compose(throwError, invalidFailureStructureErrorMessage)

export default curry((rendererMessages, validatorMessages) => failureObj => {
  const {
    payloadErrorMessage,
    renderObjectFieldsError,
    // Render
    renderObject,
    renderArray,
    renderArrayValue,
  } = rendererMessages
  // ---------------------------------------------------------------------------
  // Configure
  // ---------------------------------------------------------------------------

  const renderPayload = compose(payloadRenderer, messageLookup)(
    validatorMessages
  )
  const renderAndOrMessage = andOrRenderer(renderPayload, rendererMessages)
  const renderPayloadMessage = payloadErrorMessage(renderPayload)
  const renderObjectFieldsErrorMessage = renderObjectFieldsError(renderPayload)

  // ---------------------------------------------------------------------------
  // Value
  // ---------------------------------------------------------------------------

  const processValue = (level, fieldValue, fieldName) =>
    cond([
      [isAndOrOrObj, renderAndOrMessage],
      [isPayload, renderPayloadMessage(level, fieldName)],
      // eslint-disable-next-line no-use-before-define
      [isPlainObj, processObjectOrArray(level, fieldName)],
      [T, cannotParse],
    ])(fieldValue)

  // ---------------------------------------------------------------------------
  // Array
  // ---------------------------------------------------------------------------

  const processArrayValues = level =>
    mapWithIndex((o, index) =>
      renderArrayValue(level, index, processValue(inc(level), o))
    )

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
      when(isNotUndefined, renderObjectFieldsErrorMessage(level)),
      propFieldsFailiureMessage
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
