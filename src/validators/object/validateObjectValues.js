import { validation as Validation } from 'folktale'
import {
  applyTo,
  ifElse,
  prop,
  compose,
  reduce,
  toPairs,
  always,
  pair,
} from 'ramda'
import { isNotUndefined } from 'ramda-adjunct'
import { toObjectError } from '../../utils/failures'
import {
  composeFailure,
  matchWithSuccessOrFailure,
} from '../../utils/validations'

const { Success, Failure } = Validation

const validate = validatorsMap => (acc, [name, v]) =>
  compose(
    ifElse(
      isNotUndefined,
      compose(
        matchWithSuccessOrFailure(always(acc), ({ value }) =>
          acc.concat(Failure([pair(name, value)]))
        ),
        applyTo(v)
      ),
      always(acc)
    ),
    prop(name)
  )(validatorsMap)

const validateObjectValues = validatorsMap => o =>
  compose(reduce(validate(validatorsMap), Success(o)), toPairs)(o).orElse(
    composeFailure(toObjectError)
  )

export default validateObjectValues
