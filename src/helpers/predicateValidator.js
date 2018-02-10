import { validation as Validation } from 'folktale'
import toPayload from '../failures/toPayload'

const { Success, Failure } = Validation

export default (predicate, uid, args) => o =>
  predicate(o) ? Success(o) : Failure(toPayload(uid, o, args))
