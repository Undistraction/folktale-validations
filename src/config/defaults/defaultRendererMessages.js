import { isNotNull } from 'ramda-adjunct'
import { always, curry, ifElse } from 'ramda'
import {
  joinWithColon,
  joinWithAnd,
  joinWithOr,
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

const includedInvalidTypeMessage = type => `included invalid ${type}(s)`

const prefixWithObjectKey = curry((level, value) =>
  joinWithSpace([joinWithEmDash([newlineAndTabsForLevel(level), KEY]), value])
)

const prefixWithArrayIndex = (level, index, value) =>
  joinWithSpace([
    joinWithEmDash([
      newlineAndTabsForLevel(level),
      wrapWithSquareBrackets(index),
    ]),
    value,
  ])

const errorMessageFromPayload = renderer => (level, name) => value =>
  ifElse(
    isNotNull,
    always(
      prefixWithObjectKey(
        level,
        joinWithColon([wrapWithSingleQuotes(name), renderer(value)])
      )
    ),
    always(renderer(value))
  )(name)

const arrayValueErrorMessage = (level, index, value) =>
  prefixWithArrayIndex(level, index, value)

const fieldsErrorMessage = renderer => (level, value) =>
  joinWithEmDash([newlineAndTabsForLevel(level), renderer(value)])

const invalidObjectPrefix = always(OBJECT)
const invalidArrayPrefix = always(ARRAY)
const invalidArgumentsPrefix = always(ARGUMENTS)

const invalidObjectReasonInvalidValues = level =>
  joinWithEmDash([
    newlineAndTabsForLevel(level),
    includedInvalidTypeMessage(VALUE),
  ])

const invalidArrayReasonInvalidObjects = always(
  includedInvalidTypeMessage(OBJECT)
)

const group = wrapWithSoftBrackets

export default {
  invalidObjectReasonInvalidValues,
  errorMessageFromPayload,
  prefixWithObjectKey,
  invalidObjectPrefix,
  invalidArrayPrefix,
  invalidArgumentsPrefix,
  arrayValueErrorMessage,
  invalidArrayReasonInvalidObjects,
  fieldsErrorMessage,
  joinWithAnd,
  joinWithOr,
  group,
}
