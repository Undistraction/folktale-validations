import { compose, converge, map, prop } from 'ramda'
import { list } from 'ramda-adjunct'
import { pickDefined } from './object'

export const toArgsObj = pickDefined
export const fromArgsObj = compose(converge(list), map(prop))
