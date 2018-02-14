import {
  reduce,
  isEmpty,
  update,
  assoc,
  append,
  compose,
  prop,
  filter,
  ifElse,
  when,
  always,
} from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import { validation as Validation } from 'folktale'
import { constraintsForFieldsWithPropChildren } from '../utils'
import {
  filterFailures,
  alwaysSuccess,
  composeFailure,
} from '../../utils/validations'
import {
  reduceObjIndexed,
  reduceObjIndexedWithIndex,
  reduceIf,
} from '../../utils/iteration'
import { toChildrenFieldsError } from '../../failures/utils'
import validateObject from './validateObject'
import { propFields } from '../../../lib/utils/constraints'
import { hasPropDefaultValue } from '../../utils/constraints'

const { Success } = Validation

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

const fieldsHaveDefaults = compose(filter(hasPropDefaultValue), propFields)

const validateChildrenOfArrayField = (
  fieldName,
  fieldValue,
  childConstraints
) =>
  reduceIf(
    always(isNotEmpty(fieldValue) || fieldsHaveDefaults(childConstraints)),
    (acc, child) =>
      append(validateObject(fieldName, childConstraints, child), acc),
    [],
    fieldValue
  )

const validateChildrenOfArrayFields = o =>
  reduce((acc, [fieldName, fieldValue, childConstraints]) => {
    const childValidations = validateChildrenOfArrayField(
      fieldName,
      fieldValue,
      childConstraints
    )
    return when(
      always(isNotEmpty(childValidations)),
      assoc(fieldName, childValidations)
    )(acc)
  }, {})(o)

// -----------------------------------------------------------------------------
// Process Fields that have children (that have a value that is an array)
// -----------------------------------------------------------------------------

export default constraints => o => {
  const fieldToValidationsMap = compose(
    validateChildrenOfArrayFields,
    constraintsForFieldsWithPropChildren(constraints)
  )(o)

  if (isEmpty(fieldToValidationsMap)) {
    return Success(o)
  }

  const fieldsWithFailures = filter(
    compose(isNotEmpty, filterFailures),
    fieldToValidationsMap
  )

  return ifElse(
    isEmpty,
    alwaysSuccess(replaceChildrenOfArrayFields(fieldToValidationsMap, o)),
    composeFailure(toChildrenFieldsError)
  )(fieldsWithFailures)
}
