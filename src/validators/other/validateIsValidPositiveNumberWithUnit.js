import { both } from 'ramda'
import { isNumberWithUnit } from 'cssapi-units'
import predicateValidator from '../../helpers/predicateValidator'
import { VALIDATE_IS_VALID_POSITIVE_NUMBER_WITH_UNIT } from '../../const/validatorUids'
import { isNumericPartOfUnitValuePositive } from '../../utils/predicates'

// Create a type validator
export default unit =>
  predicateValidator(
    both(isNumberWithUnit([unit]), isNumericPartOfUnitValuePositive),
    VALIDATE_IS_VALID_POSITIVE_NUMBER_WITH_UNIT,
    [unit]
  )
