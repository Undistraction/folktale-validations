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
import { filterFailures } from '../utils/validations'

const { IS_REQUIRED, CHILDREN, VALUE } = CONSTRAINT_FIELD_NAMES

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

const isRequired = both(hasPropIsRequired, propSatisfies(isTrue, IS_REQUIRED))
const hasChildFailures = compose(isNotEmpty, filterFailures)

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
    isNotUndefined(constraintsForNestedObj) &&
    isNotEmpty(constraintsForNestedObj) &&
    isNotEmpty(fieldValue)
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
