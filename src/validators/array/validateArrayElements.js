import { validation as Validation } from 'folktale'
import { of, prepend, toString } from 'ramda'

import { toArrayError } from '../../failures/utils'
import { propValue } from '../../utils/props'
import { alwaysSuccess, composeFailure } from '../../utils/validations'
import { reduceWithIndex } from '../../utils/iteration'

const { Success } = Validation

const validateAllWith = (validator, o) =>
  reduceWithIndex(
    (acc, element, index) =>
      acc.concat(
        validator(element).orElse(
          composeFailure(of, prepend(toString(index)), of)
        )
      ),
    Success(),
    o
  )

export default validator => o => {
  const validation = validateAllWith(validator, o)
  return validation.matchWith({
    Success: alwaysSuccess(o),
    Failure: composeFailure(toArrayError, propValue),
  })
}
