import { curry } from 'ramda'
import { isNumberWithUnit } from 'cssapi-units'
import predicateValidator from './predicateValidator'

// Create a type validator
export default curry((message, unit) =>
  predicateValidator(message(unit), isNumberWithUnit([unit]))
)
