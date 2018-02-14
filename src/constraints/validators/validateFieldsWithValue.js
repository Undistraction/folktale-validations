import { compose, reduce, assoc, isEmpty, toPairs, ifElse } from 'ramda'
import { constraintsForFieldsWithPropValue } from '../utils'
import {
  filterFailures,
  extractFailureValues,
  alwaysSuccess,
  composeFailure,
} from '../../utils/validations'
import { toObjectError } from '../../failures/utils'
import validateObject from './validateObject'

const validateValues = reduce(
  (acc, [fieldName, fieldValue, childConstraints]) =>
    assoc(
      fieldName,
      validateObject(fieldName, childConstraints, fieldValue),
      acc
    ),
  {}
)

export default constraints => o =>
  compose(
    ifElse(
      isEmpty,
      alwaysSuccess(o),
      composeFailure(toObjectError, extractFailureValues, toPairs)
    ),
    filterFailures,
    validateValues,
    constraintsForFieldsWithPropValue(constraints)
  )(o)
