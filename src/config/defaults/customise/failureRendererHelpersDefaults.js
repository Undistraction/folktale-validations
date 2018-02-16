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

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const KEY = always(`Key`)
const ARGUMENTS = always(`Arguments`)
const OBJECT = always(`Object`)
const ARRAY = always(`Array`)
const AND = always(`and`)
const OR = always(`or`)
const INVALID_VALUES_MESSAGE = always(`included invalid value(s)`)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const prefixWithObjectKey = curry((level, value) =>
  joinWithSpace([joinWithEmDash([newlineAndTabsForLevel(level), KEY()]), value])
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

const invalidArgumentsPrefix = ARGUMENTS

const invalidObjectReasonInvalidValues = level =>
  joinWithEmDash([newlineAndTabsForLevel(level), INVALID_VALUES_MESSAGE()])

const invalidArrayReasonInvalidValues = always(
  joinWithSpace([ARRAY(), INVALID_VALUES_MESSAGE()])
)

// ---------------------------------------------------------------------------
// Renderers
// ---------------------------------------------------------------------------

const renderAnds = compose(join, wrapWithSpaces)(AND())
const renderOrs = compose(join, wrapWithSpaces)(OR())
const renderGroup = wrapWithSoftBrackets

const renderObjectFieldsError = renderer => level => value =>
  joinWithEmDash([newlineAndTabsForLevel(level), renderer(value)])

const renderArrayValue = (level, index, value) =>
  prefixWithArrayIndex(level, index, value)

const renderArray = (level, fieldName) => values =>
  compose(
    when(always(isNotUndefined(fieldName)), prefixWithKey(level, fieldName)),
    joinWithSpace,
    prepend(invalidArrayReasonInvalidValues()),
    of,
    joinWithNoSpace
  )(values)

const renderObjectPrefix = (fieldName, level, objName) =>
  compose(
    when(always(isNotUndefined(fieldName)), prefixWithKey(level, fieldName)),
    defaultTo(OBJECT())
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

const renderPayload = renderer => (level, name) =>
  ifElse(
    always(isNotUndefined(name)),
    compose(
      prefixWithObjectKey(level),
      joinWithColon,
      prepend(wrapWithSingleQuotes(name)),
      of,
      renderer
    ),
    renderer
  )

export default {
  renderPayload,
  invalidArgumentsPrefix,
  renderObjectFieldsError,
  renderAnds,
  renderOrs,
  renderGroup,
  renderArrayValue,
  renderArray,
  renderObject,
}