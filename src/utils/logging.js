import { curry, compose, tap } from 'ramda'
import safeJsonStringify from 'safe-json-stringify'
import { joinWithColon } from '../utils/formatting'
import { appendRight } from '../utils/array'

const log = curry((loggingFunction, prefix) =>
  tap(
    compose(
      loggingFunction,
      joinWithColon,
      appendRight([prefix]),
      safeJsonStringify
    )
  )
)

// eslint-disable-next-line import/prefer-default-export, no-console
export const logToConsole = log(console.log)
