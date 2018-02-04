import { filter, append, flip } from 'ramda'
import { isNotUndefined } from 'ramda-adjunct'

export const compact = filter(isNotUndefined)
export const appendRight = flip(append)
