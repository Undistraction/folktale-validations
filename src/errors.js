import { map, compose, toPairs } from 'ramda'
import {
  joinWithColon,
  joinWithComma,
  wrapWithSquareBrackets,
  joinWithSpace,
} from './utils/formatting'

const validatorPrefix = wrapWithSquareBrackets(`renderer`)

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

export const throwInvalidFailureStructureMessage = compose(
  throwError,
  invalidFailureStructureErrorMessage
)
