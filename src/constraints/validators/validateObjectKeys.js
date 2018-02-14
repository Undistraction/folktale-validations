import untilFailureValidator from '../../helpers/untilFailureValidator'
import { toObjectFieldsError } from '../../failures/utils'
import { composeFailure } from '../../utils/validations'

export default validators => o =>
  untilFailureValidator(validators)(o).orElse(
    composeFailure(toObjectFieldsError)
  )
