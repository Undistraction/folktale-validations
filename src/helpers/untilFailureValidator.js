import { validation as Validation } from 'folktale'
import { compose, reduce, identity } from 'ramda'
import { propValue } from '../utils/props'

const { Success } = Validation

export default validators => o =>
  reduce(
    (acc, validator) =>
      acc.matchWith({
        Success: compose(validator, propValue),
        Failure: identity,
      }),
    Success(o),
    validators
  )
