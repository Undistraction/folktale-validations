import { validation as Validation } from 'folktale'
import { compose, when, reduce } from 'ramda'
import { isArray } from 'ramda-adjunct'
import { andMessages } from '../utils/failures'

const { Success, Failure } = Validation

const toErr = compose(Failure, when(isArray, andMessages))

export default validators => o =>
  reduce(
    (acc, validator) => acc.concat(validator(o)),
    Success(o),
    validators
  ).orElse(toErr)
