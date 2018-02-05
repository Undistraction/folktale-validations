import { isNotNull, isArray } from 'ramda-adjunct'
import { always, curry, ifElse, when } from 'ramda'
import {
  joinWithColon,
  joinWithAnd,
  wrapWithSingleQuotes,
  joinWithSpace,
  joinWithEmDash,
  wrapWithSquareBrackets,
  newlineAndTabsForLevel,
} from '../../utils/formatting'
import { PREDICATES } from '../../const'

const KEY = `Key`
const ARGUMENTS = `Arguments`

export const prefixWithKey = curry((level, value) =>
  joinWithSpace([joinWithEmDash([newlineAndTabsForLevel(level), KEY]), value])
)

export const prefixWithIndex = (level, index, value) =>
  joinWithSpace([
    joinWithEmDash([
      newlineAndTabsForLevel(level),
      wrapWithSquareBrackets(index),
    ]),
    value,
  ])

export const objectValueErrorMessage = (level, name) => value => {
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

export const arrayValueErrorMessage = (level, index, value) =>
  prefixWithIndex(level, index, value)

export const fieldsErrorMessage = (level, value) =>
  joinWithEmDash([newlineAndTabsForLevel(level), value])

export const invalidObjectPrefix = always(PREDICATES.Object)
export const invalidArrayPrefix = always(PREDICATES.Array)
export const invalidArgumentsPrefix = always(ARGUMENTS)

export const invalidObjectReasonInvalidValues = level =>
  joinWithEmDash([newlineAndTabsForLevel(level), `included invalid value(s)`])

export const invalidArrayReasonInvalidObjects = always(
  `included invalid object(s)`
)

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
}
