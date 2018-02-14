import { equals, compose, map, curry, when, always } from 'ramda'
import { isPlainObjOrArray } from '../../../utils/predicates'
import { REPLACE_TOKEN } from '../const'

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

// eslint-disable-next-line import/prefer-default-export
export const replaceTokenWith = deepReplace(equals(REPLACE_TOKEN))
