import { isNotUndefined, concatRight, isNotEmpty } from 'ramda-adjunct'
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

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const KEY = `Key`
const ARGUMENTS = `Arguments`
const OBJECT = `Object`
const ARRAY = `Array`
const AND = `and`
const OR = `or`
const INVALID_VALUES_MESSAGE = `included invalid value(s)`

export default validatorMessages => {
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

  const invalidObjectReasonInvalidValues = level =>
    joinWithEmDash([newlineAndTabsForLevel(level), INVALID_VALUES_MESSAGE])

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
  ) =>
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
      append(renderObjectPrefix(fieldName, level, objName))
    )([])

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
    joinWithEmDash([
      newlineAndTabsForLevel(level),
      renderPayloadConfigured(value),
    ])

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
