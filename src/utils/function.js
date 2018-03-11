import {
  sort,
  comparator,
  prop,
  pipe,
  flip,
  apply,
  head,
  curryN,
  reduce,
  reduced,
  curry,
  ifElse,
} from 'ramda'
import { isNotNil, isNonEmptyArray, stubUndefined } from 'ramda-adjunct'

// eslint-disable-next-line import/prefer-default-export
export const applyFlipped = flip(apply)

const byArity = comparator((a, b) => a.length > b.length)

const getMaxArity = pipe(sort(byArity), head, prop(`length`))

const iteratorFn = curry((args, accumulator, fn) => {
  const result = fn(...args)

  return isNotNil(result) ? reduced(result) : accumulator
})

const dispatchImp = functions => {
  const arity = getMaxArity(functions)
  return curryN(arity, (...args) =>
    reduce(iteratorFn(args), undefined, functions)
  )
}

export const dispatch = ifElse(isNonEmptyArray, dispatchImp, stubUndefined)
