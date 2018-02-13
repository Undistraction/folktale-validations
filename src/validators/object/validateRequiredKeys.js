import { flip, has, reject, isEmpty, ifElse } from 'ramda'
import toPayload from '../../failures/toPayload'
import { REQUIRED_KEYS } from '../../const/validatorUids'
import { alwaysSuccess, alwaysFailure } from '../../constraints/utils'

const validateRequiredKeys = requiredKeys => o => {
  const collectInvalidKeys = reject(flip(has)(o))
  const invalidKeys = collectInvalidKeys(requiredKeys)
  return ifElse(
    isEmpty,
    alwaysSuccess(o),
    alwaysFailure(toPayload(REQUIRED_KEYS, o, [requiredKeys, invalidKeys]))
  )(invalidKeys)
}

export default validateRequiredKeys
