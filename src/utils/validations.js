import { compose, filter, always } from 'ramda'
import { validation as Validation } from 'folktale'
import { mapWithIndex } from '../utils/iteration'

const { Success, Failure } = Validation

export const alwaysSuccess = compose(always, Success)
export const alwaysFailure = compose(always, Failure)
export const composeFailure = (...args) => compose(Failure, ...args)
export const isFailure = Failure.hasInstance
export const isSuccess = Success.hasInstance

export const filterFailures = filter(isFailure)
export const extractFailureValues = mapWithIndex(([key, failure]) => [
  key,
  failure.value,
])
