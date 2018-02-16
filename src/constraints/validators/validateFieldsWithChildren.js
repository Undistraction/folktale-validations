import {
  reduce,
  isEmpty,
  update,
  assoc,
  append,
  compose,
  prop,
  ifElse,
  when,
  always,
  __,
} from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import { validation as Validation } from 'folktale'
import { nestedValueData, filterFieldsWithChildFailures } from '../utils'
import { alwaysSuccess, composeFailure } from '../../utils/validations'
import {
  reduceObjIndexed,
  reduceObjIndexedWithIndex,
} from '../../utils/iteration'
import { toChildrenFieldsError } from '../../utils/failures'
import validateObject from './validateObject'

const { Success } = Validation

// -----------------------------------------------------------------------------
// Replace the children with the validated (possibly transformed) versions.
// -----------------------------------------------------------------------------

const replaceChild = reduceObjIndexedWithIndex((acc, [, validation], i) =>
  update(i, validation.value, acc)
)

const replaceChildren = (fieldToValidationsMap, o) =>
  reduceObjIndexed(
    (acc, [fieldName, validations]) =>
      compose(assoc(fieldName, __, acc), replaceChild(prop(fieldName, acc)))(
        validations
      ),
    o,
    fieldToValidationsMap
  )

// -----------------------------------------------------------------------------
// Validate each child and collect their validations.
// -----------------------------------------------------------------------------

const validateChild = (fieldName, fieldValue, childConstraints) =>
  reduce(
    (acc, child) =>
      append(validateObject(fieldName, childConstraints, child), acc),
    [],
    fieldValue
  )

const validateChildren = reduce(
  (acc, [fieldName, fieldValue, childConstraints]) => {
    const childValidations = validateChild(
      fieldName,
      fieldValue,
      childConstraints
    )
    return when(
      always(isNotEmpty(childValidations)),
      assoc(fieldName, childValidations)
    )(acc)
  },
  {}
)

// -----------------------------------------------------------------------------
// Process Fields that have children (that have a value that is an array)
// -----------------------------------------------------------------------------

export default constraints => o => {
  const fieldToValidationsMap = compose(
    validateChildren,
    nestedValueData(constraints)
  )(o)

  if (isEmpty(fieldToValidationsMap)) {
    return Success(o)
  }

  return compose(
    ifElse(
      isEmpty,
      alwaysSuccess(replaceChildren(fieldToValidationsMap, o)),
      composeFailure(toChildrenFieldsError)
    ),
    filterFieldsWithChildFailures
  )(fieldToValidationsMap)
}
