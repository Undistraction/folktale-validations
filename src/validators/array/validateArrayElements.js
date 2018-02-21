import { validation as Validation } from 'folktale'
import { of, pair, toString } from 'ramda'
import { reduceIndexed } from 'ramda-adjunct'

import { toArrayError } from '../../utils/failures'
import { propValue } from '../../utils/props'
import { alwaysSuccess, composeFailure } from '../../utils/validations'

const { Success } = Validation

const validateAllWith = (validator, o) =>
  reduceIndexed(
    (acc, element, index) =>
      acc.concat(
        validator(element).orElse(composeFailure(of, pair(toString(index))))
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
