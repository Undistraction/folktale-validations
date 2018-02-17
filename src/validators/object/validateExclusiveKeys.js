import { validation as Validation } from 'folktale'
import { always, ifElse } from 'ramda'
import { hasNoMoreThanOneChild } from '../../utils/predicates'
import toPayload from '../../failures/toPayload'
import { VALIDATE_EXCLUSIVE_KEYS } from '../../const/validatorUids'
import { alwaysSuccess } from '../../utils/validations'
import { filterKeys } from '../../utils/object'

const { Failure } = Validation

const validateExclusiveKeys = exclusiveKeys => o => {
  const collectedExclusiveKeys = filterKeys(exclusiveKeys, o)
  return ifElse(
    hasNoMoreThanOneChild,
    alwaysSuccess(o),
    always(
      Failure(
        toPayload(VALIDATE_EXCLUSIVE_KEYS, o, [
          exclusiveKeys,
          collectedExclusiveKeys,
        ])
      )
    )
  )(collectedExclusiveKeys)
}

export default validateExclusiveKeys
