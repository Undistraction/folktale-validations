import { without, compose, keys, isEmpty, always, ifElse } from 'ramda'
import { validation as Validation } from 'folktale'
import toPayload from '../../failures/toPayload'
import { WHITELISTED_KEYS } from '../../const/validatorUids'

const { Success, Failure } = Validation

const validateWhitelistedKeys = validKeys => o => {
  const invalidKeys = compose(without(validKeys), keys)(o)
  return ifElse(
    isEmpty,
    always(Success(o)),
    always(Failure(toPayload(WHITELISTED_KEYS, o, [validKeys, invalidKeys])))
  )(invalidKeys)
}

export default validateWhitelistedKeys
