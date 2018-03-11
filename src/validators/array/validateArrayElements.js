import { validation as Validation } from 'folktale'
import { of, pair, toString, compose } from 'ramda'
import { reduceIndexed } from 'ramda-adjunct'

import { toArrayError } from '../../utils/failures'
import { propValue } from '../../utils/props'
import {
  alwaysSuccess,
  composeFailure,
  successOrElse,
  matchWithSuccessOrFailure,
} from '../../utils/validations'

const { Success } = Validation

const toError = index => compose(of, pair(toString(index)))

const validateAllWith = validator => o =>
  reduceIndexed(
    (acc, element, index) =>
      acc.concat(compose(successOrElse(toError(index)), validator)(element)),
    Success(),
    o
  )

export default validator => o =>
  compose(
    matchWithSuccessOrFailure(
      alwaysSuccess(o),
      composeFailure(toArrayError, propValue)
    ),
    validateAllWith(validator)
  )(o)
