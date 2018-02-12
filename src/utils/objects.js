import { compose, map, curry, when, always } from 'ramda'
import { isPlainObjOrArray } from './predicates'

export const { freeze } = Object

export const deepReplace = curry((pred, replacement, o) =>
  when(
    isPlainObjOrArray,
    compose(
      map(a => deepReplace(pred, replacement)(a)),
      map(when(pred, always(replacement)))
    )
  )(o)
)
