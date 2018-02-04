import { validation as Validation } from 'folktale'

const { Success, Failure } = Validation

export default (message, predicate) => o =>
  predicate(o) ? Success(o) : Failure([message])
