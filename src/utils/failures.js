import { prop, has, objOf, when } from 'ramda'
import FAILURE_FIELD_NAMES from '../const/failureFieldNames'
import { hasMoreThanOneChild } from './predicates'

const { AND, OR } = FAILURE_FIELD_NAMES

export const propName = prop(`name`)
export const propValue = prop(`value`)
export const propFields = prop(`fields`)
export const propChildren = prop(`children`)
export const propFieldsFailiureMessage = prop(`fieldsFailureMessage`)

export const hasPropChildren = has(`children`)

export const andMessages = when(hasMoreThanOneChild, objOf(AND))
export const orMessages = when(hasMoreThanOneChild, objOf(OR))
