import {
  compose,
  reduce,
  assoc,
  prop,
  toPairs,
  ifElse,
  always,
  __,
  tryCatch,
} from 'ramda'
import { isNotEmpty, isUndefined } from 'ramda-adjunct'
import { validation as Validation } from 'folktale'
import { buildTransformersMap } from './utils'
import { throwError, transformerError } from '../errors'

const { Success } = Validation

const tryTransform = (name, transformer) => value =>
  tryCatch(transformer, _ => throwError(transformerError(name, value)))(value)

const transformValues = transformersMap =>
  reduce(
    (acc, [name, transformer]) =>
      ifElse(
        isUndefined,
        always(acc),
        compose(assoc(name, __, acc), tryTransform(name, transformer))
      )(prop(name, acc)),
    __,
    toPairs(transformersMap)
  )

const transformObjectValues = transformersMap =>
  compose(Success, transformValues(transformersMap))

export default compose(
  ifElse(isNotEmpty, transformObjectValues, always(Success)),
  buildTransformersMap
)
