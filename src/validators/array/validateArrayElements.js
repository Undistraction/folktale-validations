import { validation as Validation } from 'folktale'
import { reduce, compose, of } from 'ramda'

import { toArrayError } from '../../failures/utils'
import { propValue } from '../../utils/props'
import { alwaysSuccess } from '../../constraints/utils'

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
    Success: alwaysSuccess(o),
    Failure: compose(Failure, toArrayError, propValue),
  })
}
