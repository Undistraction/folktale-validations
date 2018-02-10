import { validation as Validation } from 'folktale'
import { reduce, when, compose, of } from 'ramda'
import { isArray } from 'ramda-adjunct'
import { orMessages } from '../utils/failures'
import { appendRight } from '../utils/array'

const { Failure } = Validation

const toErr = compose(Failure, when(isArray, orMessages))

export default validators => o =>
  reduce(
    (acc, validator) =>
      !acc
        ? validator(o).orElse(compose(Failure, of))
        : acc.orElse(accFailure =>
            validator(o).orElse(compose(Failure, appendRight(accFailure)))
          ),
    null,
    validators
  ).orElse(toErr)
