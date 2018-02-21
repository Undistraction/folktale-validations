import { isNotUndefined, concatRight, isNotEmpty, list } from 'ramda-adjunct'
import {
  of,
  append,
  compose,
  always,
  curry,
  ifElse,
  defaultTo,
  prepend,
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

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export default (validatorMessages, text = {}) => {
  const mergedText = merge(defaultText, text)

  const {
    KEY,
    ARGUMENTS,
    OBJECT,
    ARRAY,
    AND,
    OR,
    INVALID_VALUES_MESSAGE,
  } = mergedText

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const prefixWithObjectKey = curry((level, value) =>
    joinWithSpace([joinWithEmDash([newlineAndTabsForLevel(level), KEY]), value])
  )

  const prefixWithKey = (level, fieldName) =>
    compose(
      prefixWithObjectKey(level),
      joinWithColon,
      prepend(wrapWithSingleQuotes(fieldName)),
      of
    )

  const prefixWithArrayIndex = (level, index, value) =>
    joinWithSpace([
      joinWithEmDash([
        newlineAndTabsForLevel(level),
        wrapWithSquareBrackets(index),
      ]),
      value,
    ])

  const invalidArgumentsPrefix = always(ARGUMENTS)

  const invalidArrayReasonInvalidValues = always(
    joinWithSpace([ARRAY, INVALID_VALUES_MESSAGE])
  )

  // ---------------------------------------------------------------------------
  // Renderers
  // ---------------------------------------------------------------------------

  const renderPayloadConfigured = compose(payloadRenderer, messageLookup)(
    validatorMessages
  )

  const renderAndOrs = compose(join, wrapWithSpaces)
  const renderAnds = renderAndOrs(AND)
  const renderOrs = renderAndOrs(OR)
  const renderGroup = wrapWithSoftBrackets

  const renderFieldNamePrefix = (level, fieldName) =>
    when(always(isNotUndefined(fieldName)), prefixWithKey(level, fieldName))

  const renderObjectPrefix = (fieldName, level, objName) =>
    compose(renderFieldNamePrefix(level, fieldName), defaultTo(OBJECT))(objName)

  // ---------------------------------------------------------------------------
  // Exports
  // ---------------------------------------------------------------------------

  const renderObject = (
    level,
    fieldName,
    objName,
    objectFields,
    fieldsErrorMessage
  ) => {
    console.log(`Fields Error Message`, fieldsErrorMessage)
    return compose(
      joinWithSpace,
      when(
        always(isNotEmpty(objectFields)),
        concatRight([INVALID_VALUES_MESSAGE, joinWithNoSpace(objectFields)])
      ),
      when(
        always(isNotUndefined(fieldsErrorMessage)),
        append(fieldsErrorMessage)
      ),
      append(renderObjectPrefix(fieldName, level, objName))
    )([])
  }

  const renderArray = (level, fieldName) => values =>
    compose(
      renderFieldNamePrefix(level, fieldName),
      joinWithSpace,
      prepend(invalidArrayReasonInvalidValues()),
      of,
      joinWithNoSpace
    )(values)

  const renderArrayValue = (level, index, value) =>
    prefixWithArrayIndex(level, index, value)

  const renderPayload = (level, fieldName) =>
    ifElse(
      always(isNotUndefined(fieldName)),
      compose(prefixWithKey(level, fieldName), renderPayloadConfigured),
      renderPayloadConfigured
    )

  const renderAndOrMessages = (level, fieldName) =>
    compose(
      renderFieldNamePrefix(level, fieldName),
      andOrRenderer(renderPayloadConfigured, {
        renderAnds,
        renderOrs,
        renderGroup,
      })
    )

  const renderObjectFieldsError = level => value =>
    useWith(compose(joinWithSpace, list), [
      newlineAndTabsForLevel,
      renderPayloadConfigured,
    ])(level, value)

  return {
    renderObject,
    renderArray,
    renderArrayValue,
    renderPayload,
    renderAndOrMessages,
    renderObjectFieldsError,
    invalidArgumentsPrefix,
  }
}
