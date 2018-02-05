import { compose, identity } from 'ramda'
import { validation as Validation } from 'folktale'
import { propValue } from '../utils/props'
import { fieldErrorMessage } from '../messages'

const { Failure } = Validation

export const applySuccessValueTo = f => compose(f, propValue)

export const chain = (acc, f) =>
  acc.matchWith({
    Success: applySuccessValueTo(f),
    Failure: identity,
  })

export const withField = (field, validator) => o =>
  validator(o).orElse(message => Failure(fieldErrorMessage(field, message)))
