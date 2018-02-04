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
} from 'ramda'
import { isNotUndefined, isTruthy, isNotEmpty } from 'ramda-adjunct'
import { validation as Validation } from 'folktale'
import { CONSTRAINT_FIELD_NAMES } from '../const'
import { mapWithIndex } from '../../lib/utils'
import { propEqName, propName, hasPropIsRequired } from '../utils/constraints'

const { Failure } = Validation

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

const hasIsRequiredKey = both(
  hasPropIsRequired,
  compose(propSatisfies(isTruthy, CONSTRAINT_FIELD_NAMES.IS_REQUIRED))
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
    isNotUndefined(transformer) ? assoc(name, transformer, acc) : acc,
  {}
)

export const buildDefaultsMap = reduce(
  (acc, { name, defaultValue }) =>
    isNotUndefined(defaultValue) ? assoc(name, defaultValue, acc) : acc,
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
