import { contains } from 'ramda'
import { validation as Validation } from 'folktale'
import toPayload from '../../failures/toPayload'
import { VALIDATE_IS_WHITELISTED_VALUE } from '../../const/validatorUids'

const { Success, Failure } = Validation

export default whitelist => o =>
  contains(o, whitelist)
    ? Success(o)
    : Failure(toPayload(VALIDATE_IS_WHITELISTED_VALUE, o, [whitelist]))
