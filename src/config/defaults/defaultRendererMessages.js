import { isNotUndefined } from 'ramda-adjunct'
import { of, append, compose, always, curry, ifElse, defaultTo } from 'ramda'
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

const arrayValueErrorMessage = (level, index, value) =>
  prefixWithArrayIndex(level, index, value)

const fieldsErrorMessage = renderer => (level, value) =>
  joinWithEmDash([newlineAndTabsForLevel(level), renderer(value)])

const invalidObjectPrefix = always(OBJECT)
const invalidArgumentsPrefix = always(ARGUMENTS)

const invalidObjectReasonInvalidValues = level =>
  joinWithEmDash([
    newlineAndTabsForLevel(level),
    includedInvalidTypeMessage(VALUE),
  ])

const invalidArrayReasonInvalidObjects = always(
  includedInvalidTypeMessage(OBJECT)
)

const groupItems = wrapWithSoftBrackets

const invalidArrayPrefix = compose(
  joinWithColon,
  append(ARRAY),
  of,
  wrapWithSingleQuotes,
  defaultTo(``)
)

export default {
  invalidObjectReasonInvalidValues,
  payloadErrorMessage,
  prefixWithObjectKey,
  invalidObjectPrefix,
  invalidArrayPrefix,
  invalidArgumentsPrefix,
  arrayValueErrorMessage,
  invalidArrayReasonInvalidObjects,
  fieldsErrorMessage,
  joinWithAnd,
  joinWithOr,
  groupItems,
}
