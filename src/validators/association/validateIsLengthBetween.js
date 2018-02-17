import untilFailureValidator from '../../helpers/untilFailureValidator'
import validateIsLengthGreaterThan from './validateIsLengthGreaterThan'
import validateIsLengthLessThan from './validateIsLengthLessThan'
import { VALIDATE_IS_LENGTH_BETWEEN } from '../../const/validatorUids'
import { alwaysFailureWithPayload } from '../../utils/validations'

export default (minimumLength, maximumLength) => o =>
  untilFailureValidator([
    validateIsLengthGreaterThan(minimumLength),
    validateIsLengthLessThan(maximumLength),
  ])(o).orElse(
    alwaysFailureWithPayload(VALIDATE_IS_LENGTH_BETWEEN, o, [
      minimumLength,
      maximumLength,
    ])
  )
