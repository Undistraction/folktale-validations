import { validation as Validation } from 'folktale'
import { curry, flip, has, filter, always, of, ifElse, compose } from 'ramda'
import { hasOneChildMax } from '../../utils'

const { Success, Failure } = Validation

export default curry((message, exclusiveKeys) => o => {
  const collectExclusiveKeys = filter(flip(has)(o))
  const collectedExclusiveKeys = collectExclusiveKeys(exclusiveKeys)
  return ifElse(
    hasOneChildMax,
    always(Success(o)),
    compose(Failure, of, message)
  )(collectedExclusiveKeys)
})
