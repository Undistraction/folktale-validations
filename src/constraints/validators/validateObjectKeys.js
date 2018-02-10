import { compose } from 'ramda'
import { validation as Validation } from 'folktale'
import untilFailureValidator from '../../helpers/untilFailureValidator'
import { toObjectFieldsError } from '../../failures/utils'

const { Failure } = Validation

export default validators => o => {
  const r = untilFailureValidator(validators)(o)
  return r.orElse(compose(Failure, toObjectFieldsError))
}
