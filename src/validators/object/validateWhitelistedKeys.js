import { without, compose, keys, isEmpty, ifElse } from 'ramda'
import toPayload from '../../failures/toPayload'
import { VALIDATE_WHITELISTED_KEYS } from '../../const/validatorUids'
import { alwaysSuccess, alwaysFailure } from '../../utils/validations'

const validateWhitelistedKeys = validKeys => o => {
  const invalidKeys = compose(without(validKeys), keys)(o)
  return ifElse(
    isEmpty,
    alwaysSuccess(o),
    alwaysFailure(
      toPayload(VALIDATE_WHITELISTED_KEYS, o, [validKeys, invalidKeys])
    )
  )(invalidKeys)
}

export default validateWhitelistedKeys
