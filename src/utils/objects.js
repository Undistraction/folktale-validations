import { compose, map, curry, when, always } from 'ramda'
import { isVanillaObjectOrArray } from './predicates'

export const { freeze } = Object

export const deepReplace = curry((pred, replacement, o) =>
  when(
    isVanillaObjectOrArray,
    compose(
      map(a => deepReplace(pred, replacement)(a)),
      map(when(pred, always(replacement)))
    )
  )(o)
)
