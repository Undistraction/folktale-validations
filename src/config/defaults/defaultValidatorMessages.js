import {
  joinWithComma,
  joinWithColon,
  quoteAndJoinWithComma,
  wrapWithSingleQuotes,
  wrapWithSquareBrackets,
  joinWithSpace,
} from '../../utils/formatting'

// -----------------------------------------------------------------------------
// Predicate
// -----------------------------------------------------------------------------

const predicateMessage = name =>
  joinWithSpace([`Wasn't`, wrapWithSingleQuotes(name)])
const negatedPredicateMessage = name =>
  joinWithSpace([`Was`, wrapWithSingleQuotes(name)])

// -----------------------------------------------------------------------------
// Association
// -----------------------------------------------------------------------------

const isLengthGreaterThanMessage = length =>
  `Length wasn't greater than ${length}`

const isLengthLessThanMessage = length => `Length wasn't less than ${length}`

// -----------------------------------------------------------------------------
// Other
// -----------------------------------------------------------------------------

const isWhitelistedStringMessage = whitelist =>
  joinWithColon([
    `Value wasn't one of the accepted values`,
    joinWithComma(whitelist),
  ])

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const numberWithUnitMessage = unit =>
  joinWithColon([`Wasn't number with unit`, wrapWithSingleQuotes(unit)])

// -----------------------------------------------------------------------------
// Object
// -----------------------------------------------------------------------------

const objectValuesMessage = valueErrorMessages =>
  joinWithColon([
    `included invalid values(s)`,
    joinWithComma(valueErrorMessages),
  ])

const invalidKeysErrorMessage = invalidKeys =>
  joinWithColon([
    `included invalid key(s)`,
    wrapWithSingleQuotes(wrapWithSquareBrackets(joinWithComma(invalidKeys))),
  ])

const missingRequiredKeyErrorMessage = keys =>
  joinWithColon([
    `missing required key(s)`,
    wrapWithSquareBrackets(quoteAndJoinWithComma(keys)),
  ])

const exclusiveKeyErrorMessage = keys =>
  joinWithColon([
    `had more than one exlusive key`,
    wrapWithSquareBrackets(quoteAndJoinWithComma(keys)),
  ])

const objectValueErrorMessage = (name, value) =>
  `Key ${joinWithColon([wrapWithSingleQuotes(name), value])}`

// -----------------------------------------------------------------------------
// Array
// -----------------------------------------------------------------------------

const arrayElementsErrorMessage = elementErrorMessages =>
  joinWithColon([
    `Array contained invalid element(s)`,
    joinWithComma(elementErrorMessages),
  ])

const arrayElementErrorMessage = (value, message) =>
  joinWithColon([wrapWithSingleQuotes(value), message])

export default {
  // Predicate
  predicateMessage,
  negatedPredicateMessage,
  // Association
  isLengthGreaterThanMessage,
  isLengthLessThanMessage,
  // Helpers
  numberWithUnitMessage,
  // Object
  objectValuesMessage,
  invalidKeysErrorMessage,
  missingRequiredKeyErrorMessage,
  exclusiveKeyErrorMessage,
  objectValueErrorMessage,
  // Array
  arrayElementsErrorMessage,
  arrayElementErrorMessage,
  // Other
  isWhitelistedStringMessage,
}
