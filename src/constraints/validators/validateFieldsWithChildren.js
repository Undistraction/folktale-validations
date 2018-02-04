import {
  reduce,
  isEmpty,
  update,
  assoc,
  append,
  compose,
  prop,
  filter,
} from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import { validation as Validation } from 'folktale'
import { constraintsForFieldsWithPropChildren, filterFailures } from '../utils'
import {
  reduceObjIndexed,
  reduceObjIndexedWithIndex,
  reduceIf,
} from '../../utils'
import { toChildrenFieldsError } from '../../failures/utils'

const { Failure, Success } = Validation

// -----------------------------------------------------------------------------
// Replace the children with the validated (possibly transformed) versions.
// -----------------------------------------------------------------------------

const replaceChildrenOfArrayField = reduceObjIndexedWithIndex(
  (acc, [, validation], i) => update(i, validation.value, acc)
)

const replaceChildrenOfArrayFields = (fieldToValidationsMap, o) =>
  reduceObjIndexed(
    (acc, [fieldName, validations]) =>
      assoc(
        fieldName,
        replaceChildrenOfArrayField(prop(fieldName, acc), validations),
        acc
      ),
    o,
    fieldToValidationsMap
  )

// -----------------------------------------------------------------------------
// Validate each child and collect their validations.
// -----------------------------------------------------------------------------

const validateChildrenOfArrayField = (
  validateObject,
  fieldName,
  fieldValue,
  childConstraints
) =>
  reduceIf(
    isNotEmpty,
    (acc, child) =>
      append(validateObject(fieldName, childConstraints, child), acc),
    [],
    fieldValue
  )

const validateChildrenOfArrayFields = validateObject =>
  reduce((acc, [fieldName, fieldValue, childConstraints]) => {
    const childValidations = validateChildrenOfArrayField(
      validateObject,
      fieldName,
      fieldValue,
      childConstraints
    )
    return isEmpty(childValidations)
      ? acc
      : assoc(fieldName, childValidations, acc)
  }, {})

// -----------------------------------------------------------------------------
// Process Fields that have children (that have a value that is an array)
// -----------------------------------------------------------------------------

export default (validateObject, constraints) => o => {
  const fieldToValidationsMap = compose(
    validateChildrenOfArrayFields(validateObject),
    constraintsForFieldsWithPropChildren(constraints)
  )(o)

  if (isEmpty(fieldToValidationsMap)) {
    return Success(o)
  }

  const failures = filter(
    compose(isNotEmpty, filterFailures),
    fieldToValidationsMap
  )

  if (isEmpty(failures)) {
    return Success(replaceChildrenOfArrayFields(fieldToValidationsMap, o))
  }

  const out = toChildrenFieldsError(failures)

  return Failure(out)
}
