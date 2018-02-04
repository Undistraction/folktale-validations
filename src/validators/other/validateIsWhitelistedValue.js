import { curry, contains } from 'ramda'
import { validation as Validation } from 'folktale'

const { Success, Failure } = Validation

export default curry((message, whitelist) => o =>
  contains(o, whitelist) ? Success(o) : Failure([message(whitelist)])
)
