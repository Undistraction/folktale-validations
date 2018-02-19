import { validation as Validation } from 'folktale'
import { compose, reduce, identity } from 'ramda'
import { propValue } from '../utils/props'
import { matchWithSuccessOrFailure } from '../utils/validations'

const { Success } = Validation

export default validators => o =>
  reduce(
    (acc, validator) =>
      matchWithSuccessOrFailure(compose(validator, propValue), identity, acc),
    Success(o),
    validators
  )
