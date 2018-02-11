import { contains } from 'ramda'
import { validation as Validation } from 'folktale'
import toPayload from '../../failures/toPayload'
import { IS_NOT_BLACKLISTED_VALUE } from '../../const/validatorUids'

const { Success, Failure } = Validation

export default blacklist => o =>
  contains(o, blacklist)
    ? Failure(toPayload(IS_NOT_BLACKLISTED_VALUE, o, [blacklist]))
    : Success(o)
