import { always, compose, of } from 'ramda'
import { validation as Validation } from 'folktale'
import { propValue } from './utils/props'
import {
  joinWithColon,
  joinWithOr,
  joinWithAnd,
  wrapWithSingleQuotes,
} from './utils/formatting'
import { ROOT_FIELD } from './const'

const { Failure } = Validation

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

export const joinMessagesWithAnd = joinWithAnd
export const joinMessagesWithOr = joinWithOr

export const wrapFailureMessageWith = messageWrapper =>
  compose(Failure, of, messageWrapper, propValue)

// -----------------------------------------------------------------------------
// Message Renderers
// -----------------------------------------------------------------------------

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
