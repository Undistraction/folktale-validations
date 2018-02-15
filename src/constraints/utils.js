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
import { isNotUndefined, isNotEmpty } from 'ramda-adjunct'
import CONSTRAINT_FIELD_NAMES from '../const/constraintFieldNames'
import { propEqName, propName, hasPropIsRequired } from '../utils/constraints'
import { isTrue } from '../utils/predicates'

const { IS_REQUIRED } = CONSTRAINT_FIELD_NAMES

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

const isRequired = both(hasPropIsRequired, propSatisfies(isTrue, IS_REQUIRED))

// -----------------------------------------------------------------------------
// Extract data from validated object
// -----------------------------------------------------------------------------

export const listRequiredKeys = compose(map(propName), filter(isRequired))

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
