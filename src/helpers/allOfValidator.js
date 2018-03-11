import { validation as Validation } from 'folktale'
import { of, ifElse, reduce, head } from 'ramda'
import { andMessages } from '../utils/failures'
import { isArrayWithOneChild } from '../utils/predicates'
import { composeFailure } from '../utils/validations'

const { Success } = Validation

const toError = composeFailure(ifElse(isArrayWithOneChild, head, andMessages))

export default validators => o =>
  reduce(
    (acc, validator) => acc.concat(validator(o).orElse(composeFailure(of))),
    Success(o),
    validators
  ).orElse(toError)
