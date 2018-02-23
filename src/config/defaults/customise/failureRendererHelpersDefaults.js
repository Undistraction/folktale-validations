import {
  isNotUndefined,
  concatRight,
  isNotEmpty,
  compact,
  appendFlipped,
} from 'ramda-adjunct'
import {
  append,
  compose,
  always,
  pair,
  defaultTo,
  when,
  join,
  merge,
  prepend,
  flatten,
} from 'ramda'
import {
  joinWithColon,
  wrapWithSingleQuotes,
  joinWithSpace,
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

  const {
    KEY,
    OBJECT,
    ARRAY,
    AND,
    OR,
    INVALID_VALUES_MESSAGE,
    INDENT_PREFIX,
  } = mergedText

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const joinLines = level => join(newlineAndTabsForLevel(level))

  const keyText = compose(defaultTo(KEY), propKey)

  const prefixWithKey = (level, fieldName, scope) =>
    compose(
      joinWithSpace,
      appendFlipped([INDENT_PREFIX, keyText(scope)]),
      joinWithColon,
      pair(wrapWithSingleQuotes(fieldName))
    )

  const prefixWithArrayIndex = (level, index, value) =>
    joinWithSpace([INDENT_PREFIX, wrapWithSquareBrackets(index), value])

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

  const renderObjectHeader = (level, scope, objectFields, fieldsErrorMessage) =>
    compose(
      joinWithSpace,
      when(
        always(isNotEmpty(objectFields)),
        concatRight([INVALID_VALUES_MESSAGE])
      ),
      when(
        always(isNotUndefined(fieldsErrorMessage)),
        append(fieldsErrorMessage)
      ),
      append(renderObjectPrefix(level, propName(scope)))
    )([])

  // ---------------------------------------------------------------------------
  // Exports
  // ---------------------------------------------------------------------------

  const renderObject = (level, scope, objectFields, fieldsErrorMessage) => {
    const header = renderObjectHeader(
      level,
      scope,
      objectFields,
      fieldsErrorMessage
    )
    return compose(joinLines(level), flatten, compact)([header, objectFields])
  }

  const renderArray = level => values =>
    compose(joinLines(level), prepend(invalidArrayReasonInvalidValues()))(
      values
    )

  const renderArrayValue = (level, index, value) =>
    prefixWithArrayIndex(level, index, value)

  const renderAndOrMessages = andOrRenderer(renderPayload, {
    renderAnds,
    renderOrs,
    renderGroup,
  })

  const renderObjectFieldsError = renderPayload

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
