import { prop } from 'ramda'
import { PREDICATE_DATA_FIELD_NAMES } from '../../../const'

export const propValue = prop(PREDICATE_DATA_FIELD_NAMES.VALUE)
export const propValues = prop(PREDICATE_DATA_FIELD_NAMES.VALUES)
export const propValidators = prop(PREDICATE_DATA_FIELD_NAMES.VALIDATORS)
