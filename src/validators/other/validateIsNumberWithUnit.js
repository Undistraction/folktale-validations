import { isNumberWithUnit } from 'cssapi-units'
import predicateValidator from '../../helpers/predicateValidator'
import { VALIDATE_IS_NUMBER_WITH_UNIT } from '../../const/validatorUids'

// Create a type validator
export default unit =>
  predicateValidator(isNumberWithUnit([unit]), VALIDATE_IS_NUMBER_WITH_UNIT, [
    unit,
  ])
