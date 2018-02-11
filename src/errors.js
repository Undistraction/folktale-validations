import { map, compose, toPairs } from 'ramda'
import { joinWithColon, joinWithComma } from './utils/formatting'

export const throwError = message => {
  throw new Error(message)
}

export const noMessageForKeyErrorMessage = uid =>
  `[validator message map] No message for validator UID '${uid}`

export const messageValueMustBeFunction = kvPairs =>
  `[validator message map] All values must be functions but You supplied an object with invalid values: ${compose(
    joinWithComma,
    map(joinWithColon),
    toPairs,
    map(toString)
  )(kvPairs)}`

export const invalidFailureStructureErrorMessage = value =>
  `[default renderer] Couldn't render failure. Structure not recognised: ${JSON.stringify(
    value
  )}`
