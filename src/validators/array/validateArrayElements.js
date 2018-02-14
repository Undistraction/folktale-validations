import { validation as Validation } from 'folktale'
import { compose, of, prepend, toString } from 'ramda'

import { toArrayError } from '../../failures/utils'
import { propValue } from '../../utils/props'
import { alwaysSuccess } from '../../constraints/utils'
import { reduceWithIndex } from '../../utils/iteration'

const { Success, Failure } = Validation

const validateAllWith = (validator, o) =>
  reduceWithIndex(
    (acc, element, index) =>
      acc.concat(
        validator(element).orElse(
          compose(Failure, of, prepend(toString(index)), of)
        )
      ),
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
