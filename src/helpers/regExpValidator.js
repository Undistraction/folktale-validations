import { match, compose } from 'ramda'
import { isNonEmptyArray } from 'ramda-adjunct'
import predicateValidator from './predicateValidator'

const regExpValidator = (uid, regExp) => o =>
  predicateValidator(compose(isNonEmptyArray, match(regExp)), uid)(o)

export default regExpValidator
