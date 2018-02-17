import { always } from 'ramda'
import {
  joinWithColon,
  wrapWithSingleQuotes,
  joinWithSpace,
  toList,
} from '../../../utils/formatting'
import * as UIDS from '../../../const/validatorUids'
import PREDICATE_NAMES from '../../../const/predicateNames'

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

const requiredKeysMessage = keys =>
  joinWithColon([`missing required key(s)`, toList(keys)])

const whitelistedKeysMessage = keys =>
  joinWithColon([`included key(s) not on whitelist`, toList(keys)])

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
  // Basic Types
  [UIDS.IS_ARRAY]: predicateMessage(PREDICATE_NAMES.Array),
  [UIDS.IS_NOT_ARRAY]: negatedPredicateMessage(PREDICATE_NAMES.Array),
  [UIDS.IS_OBJECT]: predicateMessage(PREDICATE_NAMES.Object),
  [UIDS.IS_NOT_OBJECT]: negatedPredicateMessage(PREDICATE_NAMES.Object),
  [UIDS.IS_BOOLEAN]: predicateMessage(PREDICATE_NAMES.Boolean),
  [UIDS.IS_NOT_BOOLEAN]: negatedPredicateMessage(PREDICATE_NAMES.Boolean),
  [UIDS.IS_STRING]: predicateMessage(PREDICATE_NAMES.String),
  [UIDS.IS_NOT_STRING]: negatedPredicateMessage(PREDICATE_NAMES.String),
  [UIDS.IS_FUNCTION]: predicateMessage(PREDICATE_NAMES.Function),
  [UIDS.IS_NOT_FUNCTION]: negatedPredicateMessage(PREDICATE_NAMES.Function),
  [UIDS.IS_NUMBER]: predicateMessage(PREDICATE_NAMES.Number),
  [UIDS.IS_NOT_NUMBER]: negatedPredicateMessage(PREDICATE_NAMES.Number),

  // Complex Objs
  [UIDS.IS_DATE]: predicateMessage(PREDICATE_NAMES.Date),
  [UIDS.IS_NOT_DATE]: negatedPredicateMessage(PREDICATE_NAMES.Date),
  [UIDS.IS_REGEXP]: predicateMessage(PREDICATE_NAMES.RegExp),
  [UIDS.IS_NOT_REGEXP]: negatedPredicateMessage(PREDICATE_NAMES.RegExp),
  [UIDS.IS_PLAIN_OBJECT]: predicateMessage(PREDICATE_NAMES.plainObject),
  [UIDS.IS_NOT_PLAIN_OBJECT]: negatedPredicateMessage(
    PREDICATE_NAMES.plainObject
  ),

  // Nil Values
  [UIDS.IS_NAN]: predicateMessage(PREDICATE_NAMES.NaN),
  [UIDS.IS_NOT_NAN]: negatedPredicateMessage(PREDICATE_NAMES.NaN),
  [UIDS.IS_NIL]: predicateMessage(PREDICATE_NAMES.Nil),
  [UIDS.IS_NOT_NIL]: negatedPredicateMessage(PREDICATE_NAMES.Nil),
  [UIDS.IS_NULL]: predicateMessage(PREDICATE_NAMES.Null),
  [UIDS.IS_NOT_NULL]: negatedPredicateMessage(PREDICATE_NAMES.Null),
  [UIDS.IS_UNDEFINED]: predicateMessage(PREDICATE_NAMES.Undefined),
  [UIDS.IS_NOT_UNDEFINED]: negatedPredicateMessage(PREDICATE_NAMES.Undefined),

  // Empty
  [UIDS.IS_EMPTY]: predicateMessage(PREDICATE_NAMES.empty),
  [UIDS.IS_NOT_EMPTY]: negatedPredicateMessage(PREDICATE_NAMES.empty),
  [UIDS.IS_EMPTY_ARRAY]: predicateMessage(PREDICATE_NAMES.emptyArray),
  [UIDS.IS_NON_EMPTY_ARRAY]: negatedPredicateMessage(
    PREDICATE_NAMES.emptyArray
  ),
  [UIDS.IS_EMPTY_STRING]: predicateMessage(PREDICATE_NAMES.emptyString),
  [UIDS.IS_NON_EMPTY_STRING]: negatedPredicateMessage(
    PREDICATE_NAMES.emptyString
  ),

  // Valid
  [UIDS.IS_VALID_DATE]: predicateMessage(PREDICATE_NAMES.validDate),
  [UIDS.IS_NOT_VALID_DATE]: negatedPredicateMessage(PREDICATE_NAMES.validDate),
  [UIDS.IS_VALID_NUMBER]: predicateMessage(PREDICATE_NAMES.validNumber),
  [UIDS.IS_NOT_VALID_NUMBER]: negatedPredicateMessage(
    PREDICATE_NAMES.validNumber
  ),

  // Numeric
  [UIDS.IS_POSITIVE]: predicateMessage(PREDICATE_NAMES.positive),
  [UIDS.IS_NEGATIVE]: predicateMessage(PREDICATE_NAMES.negative),

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
