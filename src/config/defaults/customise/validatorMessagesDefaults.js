import { always } from 'ramda'
import {
  joinWithComma,
  joinWithColon,
  wrapWithSingleQuotes,
  joinWithSpace,
  toList,
} from '../../../utils/formatting'
import * as UIDS from '../../../const/validatorUids'
import PREDICATES from '../../../const/predicates'

// -----------------------------------------------------------------------------
// Predicate
// -----------------------------------------------------------------------------

const predicateMessage = name => always(joinWithSpace([`Wasn't`, name]))

const negatedPredicateMessage = name => always(joinWithSpace([`Was`, name]))

// -----------------------------------------------------------------------------
// Association
// -----------------------------------------------------------------------------

const isLengthGreaterThanMessage = length =>
  `Length wasn't greater than '${length}'`

const isLengthLessThanMessage = length => `Length wasn't less than '${length}'`

const isLengthBetweenMessage = (low, high) =>
  `Length wasn't between '${low}' and '${high}'`

// -----------------------------------------------------------------------------
// Object
// -----------------------------------------------------------------------------

const exclusiveKeysMessage = keys =>
  joinWithColon([`had more than one exlusive key`, toList(keys)])

const objectValuesMessage = valueErrorMessages =>
  joinWithColon([
    `included invalid values(s)`,
    joinWithComma(valueErrorMessages),
  ])

const requiredKeysMessage = keys =>
  joinWithColon([`missing required key(s)`, toList(keys)])

const whitelistedKeysMessage = keys =>
  joinWithColon([`included key(s) not on whitelist`, toList(keys)])

// -----------------------------------------------------------------------------
// Array
// -----------------------------------------------------------------------------

const arrayElementsMessage = elementErrorMessages =>
  joinWithColon([
    `Array contained invalid element(s)`,
    joinWithComma(elementErrorMessages),
  ])

const isArrayOfMessage = (value, message) =>
  joinWithColon([wrapWithSingleQuotes(value), message])

// -----------------------------------------------------------------------------
// Other
// -----------------------------------------------------------------------------

const isWhitelistedValueMessage = whitelist =>
  joinWithColon([`Value wasn't on the whitelist`, toList(whitelist)])

const isNotBlacklistedValueMessage = blacklist =>
  joinWithColon([`Value was on the blacklist`, toList(blacklist)])

const isNumberWithUnitMessage = unit =>
  joinWithColon([`Wasn't number with unit`, wrapWithSingleQuotes(unit)])

const messageMap = {
  // ---------------------------------------------------------------------------
  // Predicate
  // ---------------------------------------------------------------------------
  [UIDS.IS_ARRAY]: predicateMessage(PREDICATES.Array),
  [UIDS.IS_NOT_ARRAY]: negatedPredicateMessage(PREDICATES.Array),
  [UIDS.IS_OBJECT]: predicateMessage(PREDICATES.Object),
  [UIDS.IS_NOT_OBJECT]: negatedPredicateMessage(PREDICATES.Object),
  [UIDS.IS_BOOLEAN]: predicateMessage(PREDICATES.Boolean),
  [UIDS.IS_NOT_BOOLEAN]: negatedPredicateMessage(PREDICATES.Boolean),
  [UIDS.IS_DATE]: predicateMessage(PREDICATES.Date),
  [UIDS.IS_NOT_DATE]: negatedPredicateMessage(PREDICATES.Date),
  [UIDS.IS_STRING]: predicateMessage(PREDICATES.String),
  [UIDS.IS_NOT_STRING]: negatedPredicateMessage(PREDICATES.String),
  [UIDS.IS_FUNCTION]: predicateMessage(PREDICATES.Function),
  [UIDS.IS_NOT_FUNCTION]: negatedPredicateMessage(PREDICATES.Function),
  [UIDS.IS_NUMBER]: predicateMessage(PREDICATES.Number),
  [UIDS.IS_NOT_NUMBER]: negatedPredicateMessage(PREDICATES.Number),
  [UIDS.IS_EMPTY]: predicateMessage(PREDICATES.empty),
  [UIDS.IS_NOT_EMPTY]: negatedPredicateMessage(PREDICATES.empty),
  [UIDS.IS_EMPTY_ARRAY]: predicateMessage(PREDICATES.emptyArray),
  [UIDS.IS_NON_EMPTY_ARRAY]: negatedPredicateMessage(PREDICATES.emptyArray),
  [UIDS.IS_EMPTY_STRING]: predicateMessage(PREDICATES.emptyString),
  [UIDS.IS_NON_EMPTY_STRING]: negatedPredicateMessage(PREDICATES.emptyString),
  [UIDS.IS_NAN]: predicateMessage(PREDICATES.NaN),
  [UIDS.IS_NOT_NAN]: negatedPredicateMessage(PREDICATES.NaN),
  [UIDS.IS_NIL]: predicateMessage(PREDICATES.Nil),
  [UIDS.IS_NOT_NIL]: negatedPredicateMessage(PREDICATES.Nil),
  [UIDS.IS_NULL]: predicateMessage(PREDICATES.Null),
  [UIDS.IS_NOT_NULL]: negatedPredicateMessage(PREDICATES.Null),
  [UIDS.IS_UNDEFINED]: predicateMessage(PREDICATES.Undefined),
  [UIDS.IS_NOT_UNDEFINED]: negatedPredicateMessage(PREDICATES.Undefined),
  [UIDS.IS_PLAIN_OBJECT]: predicateMessage(PREDICATES.plainObject),
  [UIDS.IS_NOT_PLAIN_OBJECT]: negatedPredicateMessage(PREDICATES.plainObject),
  [UIDS.IS_VALID_DATE]: predicateMessage(PREDICATES.validDate),
  [UIDS.IS_NOT_VALID_DATE]: negatedPredicateMessage(PREDICATES.validDate),
  [UIDS.IS_VALID_NUMBER]: predicateMessage(PREDICATES.validNumber),
  [UIDS.IS_NOT_VALID_NUMBER]: negatedPredicateMessage(PREDICATES.validNumber),
  [UIDS.IS_POSITIVE]: predicateMessage(PREDICATES.positive),
  [UIDS.IS_NEGATIVE]: predicateMessage(PREDICATES.negative),
  // ---------------------------------------------------------------------------
  // Array
  // ---------------------------------------------------------------------------
  [UIDS.IS_ARRAY_OF]: isArrayOfMessage,
  [UIDS.ARRAY_ELEMENTS]: arrayElementsMessage,
  // ---------------------------------------------------------------------------
  // Association
  // ---------------------------------------------------------------------------
  [UIDS.IS_LENGTH_BETWEEN]: isLengthBetweenMessage,
  [UIDS.IS_LENGTH_GREATER_THAN]: isLengthGreaterThanMessage,
  [UIDS.IS_LENGTH_LESS_THAN]: isLengthLessThanMessage,
  // ---------------------------------------------------------------------------
  // Object
  // ---------------------------------------------------------------------------
  [UIDS.EXCLUSIVE_KEYS]: exclusiveKeysMessage,
  [UIDS.OBJECT_VALUES]: objectValuesMessage,
  [UIDS.REQUIRED_KEYS]: requiredKeysMessage,
  [UIDS.WHITELISTED_KEYS]: whitelistedKeysMessage,
  // ---------------------------------------------------------------------------
  // Other
  // ---------------------------------------------------------------------------
  [UIDS.IS_WHITELISTED_VALUE]: isWhitelistedValueMessage,
  [UIDS.IS_NOT_BLACKLISTED_VALUE]: isNotBlacklistedValueMessage,
  [UIDS.IS_NUMBER_WITH_UNIT]: isNumberWithUnitMessage,
}

export default messageMap
