import { curry, compose, tap } from 'ramda'
import { appendFlipped } from 'ramda-adjunct'
import safeJsonStringify from 'safe-json-stringify'
import { joinWithColon } from '../utils/formatting'

const log = curry((loggingFunction, prefix) =>
  tap(
    compose(
      loggingFunction,
      joinWithColon,
      appendFlipped([prefix]),
      safeJsonStringify
    )
  )
)

// eslint-disable-next-line import/prefer-default-export, no-console
export const logToConsole = log(console.log)
