import { always } from 'ramda'
import { validation as Validation } from 'folktale'
import untilFailureValidator from '../../helpers/untilFailureValidator'
import validateIsLengthGreaterThan from './validateIsLengthGreaterThan'
import validateIsLengthLessThan from './validateIsLengthLessThan'
import toPayload from '../../failures/toPayload'
import { IS_LENGTH_BETWEEN } from '../../const/validatorUids'

const { Failure } = Validation

export default (minimumLength, maximumLength) => o =>
  untilFailureValidator([
    validateIsLengthGreaterThan(minimumLength),
    validateIsLengthLessThan(maximumLength),
  ])(o).orElse(
    always(
      Failure(toPayload(IS_LENGTH_BETWEEN, o, [minimumLength, maximumLength]))
    )
  )
