import { validation as Validation } from 'folktale'
import { reduce, concat, when, compose } from 'ramda'
import { isArray } from 'ramda-adjunct'
import { orMessages } from '../utils/failures'

const { Failure } = Validation

const toErr = compose(Failure, when(isArray, orMessages))

export default validators => o =>
  reduce(
    (accumulatedValidation, validator) =>
      !accumulatedValidation
        ? validator(o)
        : accumulatedValidation.orElse(errorMessage1 =>
            validator(o).mapFailure(errorMessage2 =>
              concat(errorMessage1, errorMessage2)
            )
          ),
    null,
    validators
  ).orElse(toErr)
