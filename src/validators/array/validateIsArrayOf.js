import untilFailureValidator from '../../helpers/untilFailureValidator'
import { validateIsArray } from '../../validators/predicate/generatedPredicateValidators'
import validateArrayElements from '../../validators/array/validateArrayElements'

export default validator =>
  untilFailureValidator([validateIsArray, validateArrayElements(validator)])
