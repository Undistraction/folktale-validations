import { ifElse } from 'ramda'
import { hasNoMoreThanOneChild } from '../../utils/predicates'
import { VALIDATE_EXCLUSIVE_KEYS } from '../../const/validatorUids'
import {
  alwaysSuccess,
  alwaysFailureWithPayload,
} from '../../utils/validations'
import { filterKeys } from '../../utils/object'

const validateExclusiveKeys = exclusiveKeys => o => {
  const collectedExclusiveKeys = filterKeys(exclusiveKeys, o)
  return ifElse(
    hasNoMoreThanOneChild,
    alwaysSuccess(o),
    alwaysFailureWithPayload(VALIDATE_EXCLUSIVE_KEYS, o, [
      exclusiveKeys,
      collectedExclusiveKeys,
    ])
  )(collectedExclusiveKeys)
}

export default validateExclusiveKeys
