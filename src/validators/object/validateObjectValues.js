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
  propValue,
  matchWithSuccessOrFailure,
  successOrElse,
} from '../../utils/validations'
import { throwError, validatorError } from '../../errors'

const { Success, Failure } = Validation

const validateValue = (acc, name, value) =>
  compose(
    matchWithSuccessOrFailure(always(acc), validation =>
      acc.concat(compose(Failure, of, pair(name))(propValue(validation)))
    ),
    tryCatch(applyTo(value), _ => throwError(validatorError(name, value)))
  )

const validateExplicitFields = validatorsMap => (acc, [name, value]) =>
  compose(
    ifElse(isNotUndefined, validateValue(acc, name, value), always(acc)),
    prop(name)
  )(validatorsMap)

const validateValues = (validatorsMap, o) =>
  reduce(validateExplicitFields(validatorsMap), Success(o))

const validateObjectValues = validatorsMap => o =>
  compose(
    successOrElse(toObjectError),
    validateValues(validatorsMap, o),
    toPairs
  )(o)

export default validateObjectValues
