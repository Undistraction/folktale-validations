import { without, compose, keys, isEmpty, ifElse } from 'ramda'
import { VALIDATE_WHITELISTED_KEYS } from '../../const/validatorUids'
import {
  alwaysSuccess,
  alwaysFailureWithPayload,
} from '../../utils/validations'

const validateWhitelistedKeys = validKeys => o => {
  const invalidKeys = compose(without(validKeys), keys)(o)
  return ifElse(
    isEmpty,
    alwaysSuccess(o),
    alwaysFailureWithPayload(VALIDATE_WHITELISTED_KEYS, o, [
      validKeys,
      invalidKeys,
    ])
  )(invalidKeys)
}

export default validateWhitelistedKeys
