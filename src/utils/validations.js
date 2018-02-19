import { compose, filter, always, prop, curry } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import { validation as Validation } from 'folktale'
import VALIDATION_FIELD_NAMES from '../const/validationFieldNames'
import toPayload from '../failures/toPayload'

const { Success, Failure } = Validation

export const alwaysSuccess = compose(always, Success)
export const alwaysFailureWithPayload = compose(always, Failure, toPayload)
export const composeFailure = (...args) => compose(Failure, ...args)
export const composeSuccess = (...args) => compose(Success, ...args)
export const isFailure = Failure.hasInstance
export const isSuccess = Success.hasInstance

export const filterFailures = filter(isFailure)
export const extractFailureValues = mapIndexed(([key, failure]) => [
  key,
  failure.value,
])

export const propValue = prop(VALIDATION_FIELD_NAMES.VALUE)

export const matchWithSuccessOrFailure = curry((success, failure, validation) =>
  validation.matchWith({
    Success: success,
    Failure: failure,
  })
)
