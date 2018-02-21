import { isNotUndefined, concatRight, isNotEmpty, list } from 'ramda-adjunct'
import {
  append,
  compose,
  always,
  pair,
  defaultTo,
  when,
  join,
  useWith,
  merge,
} from 'ramda'
import {
  joinWithColon,
  joinWithNoSpace,
  wrapWithSingleQuotes,
  joinWithSpace,
  joinWithEmDash,
  wrapWithSquareBrackets,
  newlineAndTabsForLevel,
  wrapWithSoftBrackets,
  wrapWithSpaces,
} from '../../../utils/formatting'
import andOrRenderer from '../../../failures/renderers/andOrRenderer'
import payloadRenderer from '../../../failures/renderers/payloadRenderer'
import messageLookup from '../../../failures/messageLookup'
import defaultText from './failureRendererHelperTextDefault'
import { propName, propKey } from '../../../utils/failureScope'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export default (validatorMessages, text = {}) => {
  const mergedText = merge(defaultText, text)

  const { KEY, OBJECT, ARRAY, AND, OR, INVALID_VALUES_MESSAGE } = mergedText

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const textForKeys = compose(defaultTo(KEY), propKey)

  const prefixWithKey = (level, fieldName, scope) =>
    compose(
      joinWithSpace,
      pair(joinWithEmDash([newlineAndTabsForLevel(level), textForKeys(scope)])),
      joinWithColon,
      pair(wrapWithSingleQuotes(fieldName))
    )

  const prefixWithArrayIndex = (level, index, value) =>
    joinWithSpace([
      joinWithEmDash([
        newlineAndTabsForLevel(level),
        wrapWithSquareBrackets(index),
      ]),
      value,
    ])

  const invalidObjectReasonInvalidValues = level =>
    joinWithEmDash([newlineAndTabsForLevel(level), INVALID_VALUES_MESSAGE])

  const invalidArrayReasonInvalidValues = always(
    joinWithSpace([ARRAY, INVALID_VALUES_MESSAGE])
  )

  // ---------------------------------------------------------------------------
  // Renderers
  // ---------------------------------------------------------------------------

  const renderPayload = compose(payloadRenderer, messageLookup)(
    validatorMessages
  )

  const renderAndOrs = compose(join, wrapWithSpaces)
  const renderAnds = renderAndOrs(AND)
  const renderOrs = renderAndOrs(OR)
  const renderGroup = wrapWithSoftBrackets

  const renderObjectPrefix = (level, objName) =>
    compose(defaultTo(OBJECT))(objName)

  // ---------------------------------------------------------------------------
  // Exports
  // ---------------------------------------------------------------------------

  const renderObject = (level, scope, objectFields, fieldsErrorMessage) =>
    compose(
      joinWithSpace,
      when(
        always(isNotEmpty(objectFields)),
        concatRight([
          invalidObjectReasonInvalidValues(level),
          joinWithNoSpace(objectFields),
        ])
      ),
      when(
        always(isNotUndefined(fieldsErrorMessage)),
        append(fieldsErrorMessage)
      ),
      append(renderObjectPrefix(level, propName(scope)))
    )([])

  const renderArray = values =>
    compose(
      joinWithSpace,
      pair(invalidArrayReasonInvalidValues()),
      joinWithNoSpace
    )(values)

  const renderArrayValue = (level, index, value) =>
    prefixWithArrayIndex(level, index, value)

  const renderAndOrMessages = andOrRenderer(renderPayload, {
    renderAnds,
    renderOrs,
    renderGroup,
  })

  const renderObjectFieldsError = level => value =>
    useWith(compose(joinWithEmDash, list), [
      newlineAndTabsForLevel,
      renderPayload,
    ])(level, value)

  const renderFieldNamePrefix = (level, fieldName, scope) =>
    when(
      always(isNotUndefined(fieldName)),
      prefixWithKey(level, fieldName, scope)
    )

  return {
    renderObject,
    renderArray,
    renderArrayValue,
    renderPayload,
    renderAndOrMessages,
    renderObjectFieldsError,
    renderFieldNamePrefix,
  }
}
