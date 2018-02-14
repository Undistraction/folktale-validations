import {
  prop,
  fromPairs,
  compose,
  mergeAll,
  objOf,
  assoc,
  map,
  has,
  either,
  both,
  all,
  when,
  always,
} from 'ramda'
import { isObj } from 'ramda-adjunct'
import FAILURE_FIELD_NAMES from '../const/failureFieldNames'
import { propValue } from '../utils/failures'
import { constraintsObjName } from '../messages'
import { joinWithDot } from '../utils/formatting'
import { appendRight } from '../utils/array'
import { throwError, invalidFailureStructureErrorMessage } from '../errors'
import { reduceWithIndex } from '../utils/iteration'
import { isFailure } from '../utils/validations'

const {
  FIELDS_FAILURE_MESSAGE,
  FIELDS,
  CHILDREN,
  NAME,
  AND,
  OR,
} = FAILURE_FIELD_NAMES

const UIDPrefix = `folktale-validations.validate`
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

export const toObjectError = compose(objOf(FIELDS), mergeAll, fromPairs)
export const toConstraintsError = compose(assoc(NAME, constraintsObjName()))
export const toObjectFieldsError = objOf(FIELDS_FAILURE_MESSAGE)
export const toArrayError = compose(objOf(CHILDREN), fromPairs)
export const toChildrenFieldsError = compose(
  objOf(FIELDS),
  filterFailuresToChildrenObj
)

export const propAnd = prop(AND)
export const propOr = prop(OR)
export const isAndObj = has(AND)
export const isOrObj = has(OR)
export const isAndOrOrObj = both(isObj, either(isAndObj, isOrObj))
export const isPayload = all(has())

export const toValidatorUID = compose(joinWithDot, appendRight([UIDPrefix]))

export const throwInvalidFailureStructureMessage = compose(
  throwError,
  invalidFailureStructureErrorMessage
)
