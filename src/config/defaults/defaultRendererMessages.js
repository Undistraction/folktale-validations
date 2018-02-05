import { isNotNull, isArray } from 'ramda-adjunct'
import { always, curry, ifElse, when } from 'ramda'
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
import { PREDICATES } from '../../const'

const KEY = `Key`
const ARGUMENTS = `Arguments`
const OBJECT = `object`
const VALUE = `value`

const includedInvalidMessage = type => `included invalid ${type}(s)`

const prefixWithKey = curry((level, value) =>
  joinWithSpace([joinWithEmDash([newlineAndTabsForLevel(level), KEY]), value])
)

const prefixWithIndex = (level, index, value) =>
  joinWithSpace([
    joinWithEmDash([
      newlineAndTabsForLevel(level),
      wrapWithSquareBrackets(index),
    ]),
    value,
  ])

const objectValueErrorMessage = (level, name) => value => {
  const stringValue = when(isArray, joinWithAnd)(value)
  return ifElse(
    isNotNull,
    always(
      prefixWithKey(
        level,
        joinWithColon([wrapWithSingleQuotes(name), stringValue])
      )
    ),
    always(stringValue)
  )(name)
}

const arrayValueErrorMessage = (level, index, value) =>
  prefixWithIndex(level, index, value)

const fieldsErrorMessage = (level, value) =>
  joinWithEmDash([newlineAndTabsForLevel(level), value])

const invalidObjectPrefix = always(PREDICATES.Object)
const invalidArrayPrefix = always(PREDICATES.Array)
const invalidArgumentsPrefix = always(ARGUMENTS)

const invalidObjectReasonInvalidValues = level =>
  joinWithEmDash([newlineAndTabsForLevel(level), includedInvalidMessage(VALUE)])

const invalidArrayReasonInvalidObjects = always(includedInvalidMessage(OBJECT))

const group = wrapWithSoftBrackets

export default {
  invalidObjectReasonInvalidValues,
  objectValueErrorMessage,
  prefixWithKey,
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
