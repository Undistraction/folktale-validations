import { always } from 'ramda'
import { joinWithColon, wrapWithSingleQuotes } from './utils/formatting'
import { ROOT_FIELD } from './const'

// -----------------------------------------------------------------------------
// Constraint Validator Messages
// -----------------------------------------------------------------------------

export const constraintsObjName = always(`Constraints`)

export const objectValidatorErrorMessage = fieldName => messages =>
  fieldName === ROOT_FIELD
    ? joinWithColon([`Object Invalid`, messages])
    : `for field ${joinWithColon([wrapWithSingleQuotes(fieldName), messages])}`

export const fieldErrorMessage = (field, errorMessage) =>
  `Field ${joinWithColon([wrapWithSingleQuotes(field), errorMessage])}`

export const objectErrorMessageWrapper = fieldName =>
  wrapFailureMessageWith(objectValidatorErrorMessage(fieldName))
