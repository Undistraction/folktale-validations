import {
  compose,
  reduce,
  assoc,
  toPairs,
  ifElse,
  always,
  __,
  unless,
  has,
} from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import { validation as Validation } from 'folktale'
import { buildDefaultsMap } from './utils'

const { Success } = Validation

const applyDefaultsToFields = defaultsMap =>
  reduce(
    (acc, [propName, defaultValue]) =>
      unless(has(propName), assoc(propName, defaultValue))(acc),
    __,
    toPairs(defaultsMap)
  )

const applyDefaultsToObject = defaultsMap =>
  compose(Success, applyDefaultsToFields(defaultsMap))

export default compose(
  ifElse(isNotEmpty, applyDefaultsToObject, always(Success)),
  buildDefaultsMap
)
