import { reduce, when, of } from 'ramda'
import { isArray } from 'ramda-adjunct'
import { orMessages } from '../utils/failures'
import { appendRight } from '../utils/array'
import { composeFailure } from '../utils/validations'

const toErr = composeFailure(when(isArray, orMessages))

export default validators => o =>
  reduce(
    (acc, validator) =>
      !acc
        ? validator(o).orElse(composeFailure(of))
        : acc.orElse(accFailure =>
            validator(o).orElse(composeFailure(appendRight(accFailure)))
          ),
    null,
    validators
  ).orElse(toErr)
