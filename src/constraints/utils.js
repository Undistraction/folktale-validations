import {
  prop,
  compose,
  filter,
  map,
  reduce,
  assoc,
  find,
  append,
  toPairs,
  when,
  always,
} from 'ramda'
import { isNotUndefined } from 'ramda-adjunct'
import CONSTRAINT_FIELD_NAMES from '../const/constraintFieldNames'
import { propEqName, propName } from '../utils/constraints'
import {
  isNotUndefinedOrEmpty,
  hasValueOrDefaults,
  isRequired,
  hasChildFailures,
} from '../utils/predicates'

const { CHILDREN, VALUE } = CONSTRAINT_FIELD_NAMES

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

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
// Extract data from constraints object
// -----------------------------------------------------------------------------

const nestedDataReducer = (name, constraints) => (
  acc,
  [fieldName, fieldValue]
) => {
  const constraintsForNestedObj = prop(
    name,
    find(propEqName(fieldName), constraints)
  )

  if (
    isNotUndefinedOrEmpty(constraintsForNestedObj) &&
    hasValueOrDefaults(fieldValue, constraintsForNestedObj)
  ) {
    return append([fieldName, fieldValue, constraintsForNestedObj], acc)
  }
  return acc
}

const nestedData = fieldName => constraints =>
  compose(reduce(nestedDataReducer(fieldName, constraints), []), toPairs)

export const nestedValueData = nestedData(CHILDREN)
export const nestedChildrenData = nestedData(VALUE)

export const filterFieldsWithChildFailures = filter(hasChildFailures)
