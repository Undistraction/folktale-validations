export const PREDICATES = Object.freeze({
  Function: `Function`,
  Array: `Array`,
  Date: `Date`,
  Object: `Object`,
  String: `String`,
  Number: `Number`,
  Boolean: `Boolean`,
  Undefined: `Undefined`,
  Null: `null`,
  Nil: `nil`,
  NaN: `NaN`,
  empty: `Empty`,
  emptyString: `Empty String`,
  emptyArray: `Empty Array`,
  validNumber: `Valid Number`,
  validDate: `Valid Date`,
  positive: `Positive`,
  negative: `Negative`,
})

export const ROOT_FIELD = `root`
export const OWN_CONSTRAINTS = `___Own Constaints___`
export const VALIDATION_VALUE_KEY = `value`

export const CONSTRAINT_FIELD_NAMES = Object.freeze({
  ID: OWN_CONSTRAINTS,
  FIELDS: `fields`,
  FIELDS_VALIDATOR: `fieldsValidator`,
  NAME: `name`,
  VALIDATOR: `validator`,
  TRANSFORMER: `transformer`,
  IS_REQUIRED: `isRequired`,
  DEFAULT_VALUE: `defaultValue`,
  VALUE: `value`,
  CHILDREN: `children`,
  REASON: `reason`,
})

export const PREDICATE_DATA_FIELD_NAMES = Object.freeze({
  VALIDATORS: `validators`,
  VALUES: `values`,
  VALUE: `value`,
})

export const FAILURE_FIELD_NAMES = Object.freeze({
  FIELDS_FAILURE_MESSAGE: `fieldsFailureMessage`,
  FIELDS: `fields`,
  CHILDREN: `children`,
  NAME: `name`,
  AND: `and`,
  OR: `or`,
})

export const PAYLOAD_FIELD_NAMES = Object.freeze({
  UID: `uid`,
  VALUE: `value`,
  ARGS: `args`,
})
