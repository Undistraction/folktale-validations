import { prop } from 'ramda'
import FAILURE_FIELD_NAMES from '../const/failureScopeFieldNames'

const { NAME, KEY } = FAILURE_FIELD_NAMES

export const propName = prop(NAME)
export const propKey = prop(KEY)
