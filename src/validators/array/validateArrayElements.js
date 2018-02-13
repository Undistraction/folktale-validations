import { validation as Validation } from 'folktale'
import { reduce, always, compose, of } from 'ramda'

import { toArrayError } from '../../failures/utils'
import { propValue } from '../../utils/props'

const { Success, Failure } = Validation

const validateAllWith = (validator, o) =>
  reduce(
    (acc, element) =>
      acc.concat(validator(element).orElse(compose(Failure, of))),
    Success(),
    o
  )

export default validator => o => {
  const validation = validateAllWith(validator, o)
  return validation.matchWith({
    Success: always(Success(o)),
    Failure: compose(Failure, toArrayError, propValue),
  })
}
