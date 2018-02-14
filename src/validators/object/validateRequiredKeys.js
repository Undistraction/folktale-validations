import { reject, isEmpty, ifElse } from 'ramda'
import toPayload from '../../failures/toPayload'
import { REQUIRED_KEYS } from '../../const/validatorUids'
import { alwaysSuccess, alwaysFailure } from '../../utils/validations'
import { hasFlipped } from '../../utils/object'

const validateRequiredKeys = requiredKeys => o => {
  const collectInvalidKeys = reject(hasFlipped(o))
  const invalidKeys = collectInvalidKeys(requiredKeys)
  return ifElse(
    isEmpty,
    alwaysSuccess(o),
    alwaysFailure(toPayload(REQUIRED_KEYS, o, [requiredKeys, invalidKeys]))
  )(invalidKeys)
}

export default validateRequiredKeys
