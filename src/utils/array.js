import { filter, append, flip, reduce, concat } from 'ramda'
import { isNotUndefined } from 'ramda-adjunct'

export const compact = filter(isNotUndefined)
export const appendRight = flip(append)
export const concatAll = reduce(concat, [])
