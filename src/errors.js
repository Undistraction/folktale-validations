import { map, compose, toPairs } from 'ramda'
import { joinWithColon, joinWithComma } from './utils/formatting'

export const throwError = message => {
  throw new Error(message)
}

export const noMessageForKeyErrorMessage = key => `No message for key '${key}`
export const messageValueMustBeFunction = kvPairs =>
  `All values must be functions but You supplied an object with invalid values: ${compose(
    joinWithComma,
    map(joinWithColon),
    toPairs,
    map(toString)
  )(kvPairs)}`
