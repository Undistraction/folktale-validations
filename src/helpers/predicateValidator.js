import { ifElse } from 'ramda'
import { validation as Validation } from 'folktale'
import toPayload from '../failures/toPayload'
import { composeFailure } from '../utils/validations'

const { Success } = Validation

export default (predicate, uid, args) =>
  ifElse(predicate, Success, o => composeFailure(toPayload)(uid, o, args))
