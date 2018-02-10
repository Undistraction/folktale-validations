import { assoc, ifElse, always } from 'ramda'
import { toValidatorName, toValidatorUID } from '../../failures/utils'
import predicates from '../../validators/predicate/predicates'
import { reduceObjIndexed } from '../../utils/iteration'
import { joinWithSpace, wrapWithSingleQuotes } from '../../utils/formatting'

const predicateMessage = name =>
  joinWithSpace([`Wasn't`, wrapWithSingleQuotes(name)])

const negatedPredicateMessage = name =>
  joinWithSpace([`Was`, wrapWithSingleQuotes(name)])

// eslint-disable-next-line no-unused-vars
const predicateValidators = reduceObjIndexed(
  (acc, [name, [predicate, s, isNegated]]) => {
    const validatorName = toValidatorName(name)
    const validatorUID = toValidatorUID(validatorName)
    return assoc(
      validatorUID,
      ifElse(always(isNegated), negatedPredicateMessage, predicateMessage)(s),
      acc
    )
  },
  {}
)

const messages = {
  ...predicateValidators(predicates),
}

export default messages
