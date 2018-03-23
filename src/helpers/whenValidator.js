import { ifElse } from 'ramda'
import Validation from 'folktale/validation'

const { Success } = Validation

export default (predicate, validator) => v =>
  ifElse(predicate, validator, Success)(v)
