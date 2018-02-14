import untilFailureValidator from '../../helpers/untilFailureValidator'
import { toObjectFieldsError } from '../../utils/failures'
import { composeFailure } from '../../utils/validations'

export default validators => o =>
  untilFailureValidator(validators)(o).orElse(
    composeFailure(toObjectFieldsError)
  )
