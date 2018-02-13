import { validation as Validation } from 'folktale'
import { compose, reduce, assoc, isEmpty, toPairs, ifElse } from 'ramda'
import {
  constraintsForFieldsWithPropValue,
  filterFailures,
  extractFailureValues,
  alwaysSuccess,
} from '../utils'
import { toObjectError } from '../../failures/utils'
import validateObject from './validateObject'

const { Failure } = Validation

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
      compose(Failure, toObjectError, extractFailureValues, toPairs)
    ),
    filterFailures,
    validateValues,
    constraintsForFieldsWithPropValue(constraints)
  )(o)
