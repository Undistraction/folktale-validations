import { validation as Validation } from 'folktale'
import { flip, has, reject, isEmpty, ifElse, always } from 'ramda'
import toPayload from '../../failures/toPayload'
import { REQUIRED_KEYS } from '../../const/validatorUids'

const { Success, Failure } = Validation

const validateRequiredKeys = requiredKeys => o => {
  const collectInvalidKeys = reject(flip(has)(o))
  const invalidKeys = collectInvalidKeys(requiredKeys)
  return ifElse(
    isEmpty,
    always(Success(o)),
    always(Failure(toPayload(REQUIRED_KEYS, o, [requiredKeys, invalidKeys])))
  )(invalidKeys)
}

export default validateRequiredKeys
