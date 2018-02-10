import { flip, lt, compose, length } from 'ramda'
import predicateValidator from '../../helpers/predicateValidator'
import { IS_LENGTH_LESS_THAN } from '../../const/uids'

// Use any Ramda relation that returns a boolean for numeric comparison
export default stringLength =>
  predicateValidator(
    compose(flip(lt)(stringLength), length),
    IS_LENGTH_LESS_THAN,
    [stringLength]
  )
