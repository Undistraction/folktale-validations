import { validation as Validation } from 'folktale'
import { reduce, always, compose, of } from 'ramda'

import { ARRAY_ELEMENTS } from '../../const/uids'
import toPayload from '../../failures/toPayload'

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
    Failure: ({ value }) => Failure(toPayload(ARRAY_ELEMENTS, o, value)),
  })
}
