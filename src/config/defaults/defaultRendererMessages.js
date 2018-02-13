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
} from 'ramda'
import {
  joinWithColon,
  joinWithAnd,
  joinWithOr,
  joinWithNoSpace,
  wrapWithSingleQuotes,
  joinWithSpace,
  joinWithEmDash,
  wrapWithSquareBrackets,
  newlineAndTabsForLevel,
  wrapWithSoftBrackets,
} from '../../utils/formatting'

const KEY = `Key`
const ARGUMENTS = `Arguments`
const OBJECT = `Object`
const ARRAY = `Array`
const VALUE = `value`

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const includedInvalidTypeMessage = type => `included invalid ${type}(s)`

const prefixWithObjectKey = curry((level, value) =>
  joinWithSpace([joinWithEmDash([newlineAndTabsForLevel(level), KEY]), value])
)

const prefixWithKey = (level, fieldName) =>
  compose(
    prefixWithObjectKey(level),
    compose(joinWithColon, prepend(wrapWithSingleQuotes(fieldName)), of)
  )

const prefixWithArrayIndex = (level, index, value) =>
  joinWithSpace([
    joinWithEmDash([
      newlineAndTabsForLevel(level),
      wrapWithSquareBrackets(index),
    ]),
    value,
  ])

const payloadErrorMessage = renderer => (level, name) => value =>
  ifElse(
    isNotUndefined,
    always(
      prefixWithObjectKey(
        level,
        joinWithColon([wrapWithSingleQuotes(name), renderer(value)])
      )
    ),
    always(renderer(value))
  )(name)

const invalidObjectPrefix = always(OBJECT)
const invalidArgumentsPrefix = always(ARGUMENTS)

const invalidObjectReasonInvalidValues = level =>
  joinWithEmDash([
    newlineAndTabsForLevel(level),
    includedInvalidTypeMessage(VALUE),
  ])

const invalidArrayReasonInvalidValues = always(
  joinWithSpace([ARRAY, includedInvalidTypeMessage(VALUE)])
)

// -----------------------------------------------------------------------------
// Render
// -----------------------------------------------------------------------------

const renderAnds = joinWithAnd
const renderOrs = joinWithOr
const renderGroup = wrapWithSoftBrackets

const renderObjectFieldsError = renderer => level => value =>
  joinWithEmDash([newlineAndTabsForLevel(level), renderer(value)])

const renderArrayValue = (level, index, value) =>
  prefixWithArrayIndex(level, index, value)

const renderArray = (level, fieldName) => values => {
  const result = joinWithSpace([
    invalidArrayReasonInvalidValues(),
    joinWithNoSpace(values),
  ])

  return when(
    always(isNotUndefined(fieldName)),
    prefixWithKey(level, fieldName)
  )(result)
}

const renderObjectPrefix = (fieldName, level, objName) =>
  compose(
    when(always(isNotUndefined(fieldName)), prefixWithKey(level, fieldName)),
    defaultTo(invalidObjectPrefix())
  )(objName)

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

export default {
  payloadErrorMessage,
  invalidArgumentsPrefix,
  renderObjectFieldsError,
  renderAnds,
  renderOrs,
  renderGroup,
  renderArrayValue,
  renderArray,
  renderObject,
}
