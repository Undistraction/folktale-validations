import { validation as Validation } from 'folktale'
import { flip, has, filter, always, ifElse } from 'ramda'
import { hasNoMoreThanOneChild } from '../../utils/predicates'
import toPayload from '../../failures/toPayload'
import { EXCLUSIVE_KEYS } from '../../const/validatorUids'
import { alwaysSuccess } from '../../constraints/utils'

const { Failure } = Validation

const validateExclusiveKeys = exclusiveKeys => o => {
  const collectExclusiveKeys = filter(flip(has)(o))
  const collectedExclusiveKeys = collectExclusiveKeys(exclusiveKeys)
  const xsx = ifElse(
    hasNoMoreThanOneChild,
    alwaysSuccess(o),
    always(
      Failure(
        toPayload(EXCLUSIVE_KEYS, o, [exclusiveKeys, collectedExclusiveKeys])
      )
    )
  )(collectedExclusiveKeys)

  return xsx
}

export default validateExclusiveKeys
