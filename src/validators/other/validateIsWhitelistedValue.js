import { contains } from 'ramda'
import { validation as Validation } from 'folktale'
import toPayload from '../../failures/toPayload'
import { IS_WHITELISTED_VALUE } from '../../const/uids'

const { Success, Failure } = Validation

export default whitelist => o =>
  contains(o, whitelist)
    ? Success(o)
    : Failure(toPayload(IS_WHITELISTED_VALUE, o, [whitelist]))
