import { prop } from 'ramda'
import VALIDATION_FIELD_NAMES from '../const/validationFieldNames'

// eslint-disable-next-line import/prefer-default-export
export const propValue = prop(VALIDATION_FIELD_NAMES.VALUE)
