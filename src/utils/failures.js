import {
  prop,
  has,
  objOf,
  when,
  fromPairs,
  compose,
  mergeAll,
  assoc,
  map,
  either,
  both,
  always,
} from 'ramda'
import { isObj } from 'ramda-adjunct'
import FAILURE_FIELD_NAMES from '../const/failureFieldNames'
import { hasMoreThanOneChild } from './predicates'
import { constraintsObjName } from '../messages'
import { joinWithDot } from '../utils/formatting'
import { appendRight } from '../utils/array'
import { reduceWithIndex } from '../utils/iteration'
import { propValue, isFailure } from '../utils/validations'

const {
  NAME,
  FIELDS_FAILURE_MESSAGE,
  FIELDS,
  CHILDREN,
  AND,
  OR,
} = FAILURE_FIELD_NAMES

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export const propName = prop(NAME)
export const propFields = prop(FIELDS)
export const propChildren = prop(CHILDREN)
export const propFieldsFailureMessage = prop(FIELDS_FAILURE_MESSAGE)
export const propAnd = prop(AND)
export const propOr = prop(OR)

export const setPropName = assoc(NAME)

export const hasPropChildren = has(CHILDREN)
export const isAndObj = has(AND)
export const isOrObj = has(OR)
export const isAndOrOrObj = both(isObj, either(isAndObj, isOrObj))

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const filterFailuresToChildrenObj = map(
  compose(
    objOf(CHILDREN),
    reduceWithIndex(
      (acc, value, index) =>
        when(always(isFailure(value)), assoc(index, propValue(value)))(acc),
      {}
    )
  )
)

// -----------------------------------------------------------------------------
// Creation
// -----------------------------------------------------------------------------

export const andMessages = when(hasMoreThanOneChild, objOf(AND))
export const orMessages = when(hasMoreThanOneChild, objOf(OR))
export const toObjectError = compose(objOf(FIELDS), mergeAll, fromPairs)
export const toObjectFieldsError = objOf(FIELDS_FAILURE_MESSAGE)
export const toArrayError = compose(objOf(CHILDREN), fromPairs)
export const toChildrenFieldsError = compose(
  objOf(FIELDS),
  filterFailuresToChildrenObj
)

// -----------------------------------------------------------------------------
// Validator UID
// -----------------------------------------------------------------------------

const UIDPrefix = `folktale-validations.validate`
export const toValidatorUID = compose(joinWithDot, appendRight([UIDPrefix]))
