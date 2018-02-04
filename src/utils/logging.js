import { compose, tap } from 'ramda'
import { validation as Validation } from 'folktale'
import curry from '../validators/object/validateWhitelistedKeys'
import { joinWithColon } from '../utils/formatting'
import { appendRight } from '../utils/array'

const { Success } = Validation

const log = curry((loggingFunction, prefix) =>
  tap(
    compose(
      loggingFunction,
      joinWithColon,
      appendRight([prefix]),
      JSON.stringify
    )
  )
)

// eslint-disable-next-line no-console
export const logToConsole = log(console.log)

export const loggingValidator = message => validation => {
  logToConsole(message)(validation)
  return Success(validation)
}
