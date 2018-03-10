import { map, compose, toPairs } from 'ramda'
import {
  joinWithColon,
  joinWithComma,
  wrapWithSquareBrackets,
  joinWithSpace,
  wrapWithSingleQuotes,
} from './utils/formatting'

const prefix = wrapWithSquareBrackets

const validatorPrefix = prefix(`validator`)
// const rendererPrefix = prefix(`renderer`)
// const transformerPrefix = prefix(`transformer`)

export const throwError = message => {
  throw new Error(message)
}

export const noMessageForKeyErrorMessage = uid =>
  joinWithSpace([
    validatorPrefix,
    `Can't render message. No message for validator UID '${uid}'`,
  ])

export const messageValueMustBeFunction = kvPairs =>
  joinWithSpace([
    validatorPrefix,
    `All messages must be functions but You supplied an object with invalid values: ${compose(
      joinWithComma,
      map(joinWithColon),
      toPairs,
      map(toString)
    )(kvPairs)}`,
  ])

export const invalidFailureStructureErrorMessage = value =>
  joinWithSpace([
    validatorPrefix,
    `Couldn't render failure. Structure not recognised: ${JSON.stringify(
      value
    )}`,
  ])

export const validatorError = (name, value) =>
  joinWithSpace([
    validatorPrefix,
    `A validator threw an error for prop name: ${wrapWithSingleQuotes(
      name
    )} with value ${wrapWithSingleQuotes(value)}`,
  ])

export const transformerError = (name, value) =>
  joinWithSpace([
    validatorPrefix,
    `A transformer threw an error for prop name: ${wrapWithSingleQuotes(
      name
    )} with value ${wrapWithSingleQuotes(value)}`,
  ])

export const throwInvalidFailureStructureMessage = compose(
  throwError,
  invalidFailureStructureErrorMessage
)
