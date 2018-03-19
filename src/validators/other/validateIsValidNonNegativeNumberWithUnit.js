import { both } from 'ramda'
import { isNumberWithUnit } from 'cssapi-units'
import predicateValidator from '../../helpers/predicateValidator'
import { VALIDATE_IS_VALID_NON_NEGATIVE_NUMBER_WITH_UNIT } from '../../const/validatorUids'
import { isNumericPartOfUnitValueNonNegative } from '../../utils/predicates'

// Create a type validator
export default unit =>
  predicateValidator(
    both(isNumberWithUnit([unit]), isNumericPartOfUnitValueNonNegative),
    VALIDATE_IS_VALID_NON_NEGATIVE_NUMBER_WITH_UNIT,
    [unit]
  )
