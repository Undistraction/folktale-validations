import { reduce, concat } from 'ramda'

// eslint-disable-next-line import/prefer-default-export
export const concatAll = reduce(concat, [])
