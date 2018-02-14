import { flip, has, curry, compose, filter } from 'ramda'
// eslint-disable-next-line import/prefer-default-export
export const hasFlipped = flip(has)

export const filterKeys = curry((keys, o) =>
  compose(filter(flip(has)(o)))(keys)
)
