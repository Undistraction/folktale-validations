import { prop, has, objOf, when } from 'ramda'
import FAILURE_FIELD_NAMES from '../const/failureFieldNames'
import { hasMoreThanOneChild } from './predicates'

const {
  AND,
  OR,
  NAME,
  FIELDS,
  CHILDREN,
  FIELDS_FAILURE_MESSAGE,
} = FAILURE_FIELD_NAMES

export const propName = prop(NAME)
export const propFields = prop(FIELDS)
export const propChildren = prop(CHILDREN)
export const propFieldsFailureMessage = prop(FIELDS_FAILURE_MESSAGE)

export const hasPropChildren = has(CHILDREN)

export const andMessages = when(hasMoreThanOneChild, objOf(AND))
export const orMessages = when(hasMoreThanOneChild, objOf(OR))
