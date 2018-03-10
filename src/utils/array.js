import { reduce, concat, compose } from 'ramda'
import { list, compact } from 'ramda-adjunct'

export const concatAll = reduce(concat, [])

export const compactList = compose(compact, list)
