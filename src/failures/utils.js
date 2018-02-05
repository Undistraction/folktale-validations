import {
  prop,
  fromPairs,
  compose,
  mergeAll,
  objOf,
  assoc,
  of,
  map,
  has,
  either,
  __,
  gt,
  both,
} from 'ramda'
import { FAILURE_FIELD_NAMES } from '../const'
import { propValue } from '../utils/failures'
import { constraintsObjName } from '../messages'
import { isObj } from 'ramda-adjunct'

const {
  FIELDS_FAILURE_MESSAGE,
  FIELDS,
  CHILDREN,
  NAME,
  AND,
  OR,
} = FAILURE_FIELD_NAMES

export const toObjectError = compose(objOf(FIELDS), mergeAll, fromPairs)

export const toObjectFieldsError = objOf(FIELDS_FAILURE_MESSAGE)

export const addObjectName = assoc(NAME)

export const toConstraintsError = compose(assoc(NAME, constraintsObjName()))

export const toArrayError = objOf(CHILDREN, of)

const failuresToChildren = map(compose(objOf(CHILDREN), map(propValue)))

export const toChildrenFieldsError = compose(objOf(FIELDS), failuresToChildren)

export const propAnd = prop(AND)

export const propOr = prop(OR)

export const isAndObj = has(AND)
export const isOrObj = has(OR)
export const isAndOrOrObj = both(isObj, either(isAndObj, isOrObj))

export const greaterThanZero = gt(__, 0)
