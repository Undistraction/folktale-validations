import { validation as Validation } from 'folktale'
import { compose, reduce, assoc, isEmpty, toPairs } from 'ramda'
import {
  constraintsForFieldsWithPropValue,
  filterFailures,
  extractFailureValues,
} from '../utils'
import { toObjectError } from '../../failures/utils'

const { Failure, Success } = Validation

const validateValues = validateObject =>
  reduce(
    (acc, [fieldName, fieldValue, childConstraints]) =>
      assoc(
        fieldName,
        validateObject(fieldName, childConstraints, fieldValue),
        acc
      ),
    {}
  )

export default (validateObject, constraints) => o => {
  const fieldsWithPropConstraints = constraintsForFieldsWithPropValue(
    constraints
  )(o)

  const childValidations = validateValues(validateObject)(
    fieldsWithPropConstraints
  )

  const failures = filterFailures(childValidations)

  if (isEmpty(failures)) {
    return Success(o)
  }

  return compose(Failure, toObjectError, extractFailureValues, toPairs)(
    failures
  )
}
