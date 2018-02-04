import { curry } from 'ramda'
import untilFailureValidator from '../../helpers/untilFailureValidator'
import { validateIsArray } from '../../validators/predicate/generatedPredicateValidators'
import validateArrayElements from '../../validators/array/validateArrayElements'

export default curry(
  (isArrayMessage, elementsMessage, elementMessage, validator) =>
    untilFailureValidator([
      validateIsArray(isArrayMessage),
      validateArrayElements(elementsMessage, elementMessage, validator),
    ])
)
