import {
  prop,
  compose,
  filter,
  map,
  reduce,
  assoc,
  both,
  propSatisfies,
  find,
  append,
  toPairs,
  when,
  always,
} from 'ramda'
import { isNotUndefined, isTruthy, isNotEmpty } from 'ramda-adjunct'
import { validation as Validation } from 'folktale'
import CONSTRAINT_FIELD_NAMES from '../const/constraintFieldNames'
import { mapWithIndex } from '../utils/iteration'
import { propEqName, propName, hasPropIsRequired } from '../utils/constraints'

const { Success, Failure } = Validation

const { IS_REQUIRED } = CONSTRAINT_FIELD_NAMES

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

const hasIsRequiredKey = both(
  hasPropIsRequired,
  compose(propSatisfies(isTruthy, IS_REQUIRED))
)

// -----------------------------------------------------------------------------
// Extract data from validated object
// -----------------------------------------------------------------------------

export const listRequiredKeys = compose(map(propName), filter(hasIsRequiredKey))

export const buildValidatorsMap = reduce(
  (acc, { name, validator }) => assoc(name, validator, acc),
  {}
)

export const buildTransformersMap = reduce(
  (acc, { name, transformer }) =>
    when(always(isNotUndefined(transformer)), assoc(name, transformer))(acc),
  {}
)

export const buildDefaultsMap = reduce(
  (acc, { name, defaultValue }) =>
    when(always(isNotUndefined(defaultValue)), assoc(name, defaultValue))(acc),
  {}
)

// -----------------------------------------------------------------------------
// Update data on validated object
// -----------------------------------------------------------------------------

export const replaceFieldsWithValidationValues = (fieldsToValidationsMap, o) =>
  reduce(
    (acc, [fieldName, validation]) => assoc(fieldName, validation.value, o),
    o,
    toPairs(fieldsToValidationsMap)
  )

// -----------------------------------------------------------------------------
// Extract data from constraints object
// -----------------------------------------------------------------------------

export const constraintsForFieldsWithPropReducer = (name, constraints) => (
  acc,
  [fieldName, fieldValue]
) => {
  const childConstraints = prop(name, find(propEqName(fieldName), constraints))
  if (
    isNotUndefined(childConstraints) &&
    isNotEmpty(childConstraints) &&
    isNotEmpty(fieldValue)
  ) {
    return append([fieldName, fieldValue, childConstraints], acc)
  }
  return acc
}

export const constraintsForFieldsWithProp = fieldName => constraints =>
  compose(
    reduce(constraintsForFieldsWithPropReducer(fieldName, constraints), []),
    toPairs
  )

export const constraintsForFieldsWithPropChildren = constraintsForFieldsWithProp(
  CONSTRAINT_FIELD_NAMES.CHILDREN
)

export const constraintsForFieldsWithPropValue = constraintsForFieldsWithProp(
  CONSTRAINT_FIELD_NAMES.VALUE
)

// -----------------------------------------------------------------------------
// Validations
// -----------------------------------------------------------------------------

export const filterFailures = filter(Failure.hasInstance)
export const extractFailureValues = mapWithIndex(([key, failure]) => [
  key,
  failure.value,
])

export const alwaysSuccess = compose(always, Success)
export const alwaysFailure = compose(always, Failure)
