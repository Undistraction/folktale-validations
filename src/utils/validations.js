import { compose, filter, always, prop } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import { validation as Validation } from 'folktale'
import VALIDATION_FIELD_NAMES from '../const/validationFieldNames'

const { Success, Failure } = Validation

export const alwaysSuccess = compose(always, Success)
export const alwaysFailure = compose(always, Failure)
export const composeFailure = (...args) => compose(Failure, ...args)
export const isFailure = Failure.hasInstance
export const isSuccess = Success.hasInstance

export const filterFailures = filter(isFailure)
export const extractFailureValues = mapIndexed(([key, failure]) => [
  key,
  failure.value,
])

export const propValue = prop(VALIDATION_FIELD_NAMES.VALUE)
