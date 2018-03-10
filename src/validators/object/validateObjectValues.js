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
  of,
  tryCatch,
} from 'ramda'
import { isNotUndefined } from 'ramda-adjunct'
import { toObjectError } from '../../utils/failures'
import {
  composeFailure,
  matchWithSuccessOrFailure,
} from '../../utils/validations'
import { propValue } from '../../../lib/utils/validations'
import { throwError, validatorError } from '../../errors'

const { Success, Failure } = Validation

const validate = validatorsMap => (acc, [name, v]) =>
  compose(
    ifElse(
      isNotUndefined,
      compose(
        matchWithSuccessOrFailure(always(acc), validation =>
          acc.concat(compose(Failure, of, pair(name))(propValue(validation)))
        ),
        tryCatch(applyTo(v), _ => throwError(validatorError(name, v)))
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
