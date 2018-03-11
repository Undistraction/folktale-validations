import { compose, reduce, assoc, isEmpty, toPairs, ifElse, always } from 'ramda'
import { nestedChildrenData } from '../utils'
import {
  filterFailures,
  extractFailureValues,
  composeFailure,
  propValue,
  composeSuccess,
} from '../../utils/validations'
import { toObjectError } from '../../utils/failures'
import validateObject from './validateObject'
import { reduceObjIndexed } from '../../utils/iteration'

const validateValues = reduce(
  (acc, [fieldName, fieldValue, childConstraints]) =>
    assoc(fieldName, validateObject(childConstraints, fieldValue), acc),
  {}
)

const replacetWithValidatedValues = o =>
  reduceObjIndexed(
    (acc, [fieldName, validation]) =>
      assoc(fieldName, propValue(validation), acc),
    o
  )

export default constraints => o => {
  const validations = compose(validateValues, nestedChildrenData(constraints))(
    o
  )

  const result = compose(
    ifElse(
      isEmpty,
      always(
        composeSuccess(
          ifElse(isEmpty, always(o), replacetWithValidatedValues(o))
        )(validations)
      ),
      composeFailure(toObjectError, extractFailureValues, toPairs)
    ),
    filterFailures
  )(validations)
  return result
}
