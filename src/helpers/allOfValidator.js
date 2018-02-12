import { validation as Validation } from 'folktale'
import { compose, of, ifElse, reduce, head } from 'ramda'
import { andMessages } from '../utils/failures'
import { isArrayWithOneChild } from '../utils/predicates'

const { Success, Failure } = Validation

const toErr = v => {
  const r = compose(Failure, ifElse(isArrayWithOneChild, head, andMessages))(v)
  return r
}

export default validators => o =>
  reduce(
    (acc, validator) => acc.concat(validator(o).orElse(compose(Failure, of))),
    Success(o),
    validators
  ).orElse(toErr)
