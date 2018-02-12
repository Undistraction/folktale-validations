import { curry, compose, tap } from 'ramda'
import { joinWithColon } from '../utils/formatting'
import { appendRight } from '../utils/array'

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

// eslint-disable-next-line import/prefer-default-export, no-console
export const logToConsole = log(console.log)
