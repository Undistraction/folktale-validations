import { props } from 'ramda'
import { pickDefined } from './object'

export const toArgsObj = pickDefined
export const fromArgsObj = props
