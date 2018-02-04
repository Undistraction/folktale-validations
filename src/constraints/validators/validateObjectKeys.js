import { compose } from 'ramda'
import { validation as Validation } from 'folktale'
import untilFailureValidator from '../../helpers/untilFailureValidator'
import { toObjectFieldsError } from '../../failures/utils'

const { Failure } = Validation

export default validators => o =>
  untilFailureValidator(validators)(o).orElse(
    compose(Failure, toObjectFieldsError)
  )
