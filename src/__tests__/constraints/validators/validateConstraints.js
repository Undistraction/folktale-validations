import { keys, map, assoc, dissoc } from 'ramda'
import validateConstraints from '../../../constraints/validators/validateConstraints'
import typeData from '../../testHelpers/fixtures/typeData'
import FAILURE_FIELD_NAMES from '../../../const/failureFieldNames'
import CONSTRAINT_FIELD_NAMES from '../../../const/constraintFieldNames'
import constraints from '../../../constraints/constraints'
import {
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  value7,
  value8,
  name1,
  invalidKeyName,
  func,
} from '../../testHelpers/fixtures/generic'
import { pluralise, joinWithAnd } from '../../../utils/formatting'
import testLevels from '../../testHelpers/testLevels'
import validateConstraintsLevels from '../../testHelpers/data/validateConstraintsLevels'
import toPayload from '../../../failures/toPayload'
import {
  VALIDATE_IS_PLAIN_OBJECT,
  VALIDATE_WHITELISTED_KEYS,
  VALIDATE_REQUIRED_KEYS,
  VALIDATE_EXCLUSIVE_KEYS,
  VALIDATE_IS_ARRAY,
  VALIDATE_IS_FUNCTION,
  VALIDATE_IS_BOOLEAN,
  VALIDATE_IS_NOT_UNDEFINED,
} from '../../../const/validatorUids'

const {
  FIELDS,
  FIELDS_VALIDATOR,
  NAME,
  VALIDATOR,
  TRANSFORMER,
  IS_REQUIRED,
  DEFAULT_VALUE,
  VALUE,
  CHILDREN,
} = CONSTRAINT_FIELD_NAMES

const requiredKeys = [NAME, VALIDATOR]

const { FIELDS_FAILURE_MESSAGE } = FAILURE_FIELD_NAMES

const requiredFields = {
  [NAME]: name1,
  [VALIDATOR]: func,
}

const exclusiveKeys = [
  {
    [IS_REQUIRED]: true,
    [DEFAULT_VALUE]: value1,
  },
  {
    [VALUE]: {},
    [CHILDREN]: {},
  },
]

const fieldErrors = [
  // [NAME, `Wasn't 'String'`, typeData.withoutStringValues],
  [VALIDATOR, VALIDATE_IS_FUNCTION, typeData.withoutFunctionValues],
  [TRANSFORMER, VALIDATE_IS_FUNCTION, typeData.withoutFunctionValues],
  [IS_REQUIRED, VALIDATE_IS_BOOLEAN, typeData.withoutBooleanValues],
  [DEFAULT_VALUE, VALIDATE_IS_NOT_UNDEFINED, typeData.undefinedValues],
  [VALUE, VALIDATE_IS_PLAIN_OBJECT, typeData.withoutObjectValues],
  [CHILDREN, VALIDATE_IS_PLAIN_OBJECT, typeData.withoutObjectValues],
]

const requiredKeysWithout = fieldName => dissoc(fieldName)(requiredFields)

describe(`validateConstraints`, () => {
  const validateConstraintsConfigured = validateConstraints(constraints)

  // ---------------------------------------------------------------------------
  // Full nested constraint object with all features
  // ---------------------------------------------------------------------------

  describe(`with valid constraints`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const value = {
        [FIELDS]: [
          {
            [NAME]: value1,
            [VALIDATOR]: func,
            [IS_REQUIRED]: true,
            [TRANSFORMER]: func,
            [CHILDREN]: {
              [FIELDS]: [
                {
                  [NAME]: value3,
                  [VALIDATOR]: func,
                  [CHILDREN]: {}, // Allow empty object as value of childrn
                },
                {
                  [NAME]: value4,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [], // Allow empty array as value of fields
                  },
                },
                {
                  [NAME]: value5,
                  [VALIDATOR]: func,
                  [VALUE]: {}, // Allow empty object as value of value
                },
                {
                  [NAME]: value6,
                  [VALIDATOR]: func,
                  [DEFAULT_VALUE]: true,
                  [TRANSFORMER]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: value7,
                        [VALIDATOR]: func,
                      },
                      {
                        [NAME]: value8,
                        [VALIDATOR]: func,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            [NAME]: value2,
            [VALIDATOR]: func,
            [DEFAULT_VALUE]: true,
            [TRANSFORMER]: func,
          },
        ],
      }
      const validation = validateConstraintsConfigured(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  // ---------------------------------------------------------------------------
  // Perform tests for multiple levels of nesting
  // ---------------------------------------------------------------------------

  testLevels(
    validateConstraintsLevels,
    (level, { withValueRoot, withExpectedFailureObjRoot }) => {
      describe(`with ${level} constraint ${pluralise(`level`, level)}`, () => {
        // ---------------------------------------------------------------------
        // 1. Value itself
        // ---------------------------------------------------------------------
        describe(`value itself`, () => {
          describe(`with empty object`, () => {
            it(`returns a Validation.Success with supplied value`, () => {
              const value = withValueRoot({})
              const validation = validateConstraintsConfigured(value)
              expect(validation).toEqualSuccessWithValue(value)
            })
          })

          describe(`with invalid value`, () => {
            it(`returns a Validation.Failure with payload`, () => {
              map(value => {
                const validation = validateConstraintsConfigured(
                  withValueRoot(value)
                )

                const expectedFailureObj = withExpectedFailureObjRoot(
                  toPayload(VALIDATE_IS_PLAIN_OBJECT, value)
                )

                expect(validation).toEqualFailureWithValue(expectedFailureObj)
              }, typeData.withoutObjectValues)
            })
          })
        })

        // -------------------------------------------------------------------
        // 2 Keys
        // -------------------------------------------------------------------
        describe(`keys`, () => {
          describe(`additional`, () => {
            it(`returns a Validation.Failure with payload`, () => {
              const o = {
                [invalidKeyName]: value1,
              }

              const value = withValueRoot(o)

              const expectedFailureObj = withExpectedFailureObjRoot({
                [FIELDS_FAILURE_MESSAGE]: toPayload(
                  VALIDATE_WHITELISTED_KEYS,
                  o,
                  [[FIELDS_VALIDATOR, FIELDS], [invalidKeyName]]
                ),
              })

              const validation = validateConstraintsConfigured(value)

              expect(validation).toEqualFailureWithValue(expectedFailureObj)
            })
          })

          describe(`missing required`, () => {
            map(fieldName => {
              describe(fieldName, () => {
                it(`returns a Validation.Failure with payload`, () => {
                  const fields = requiredKeysWithout(fieldName)
                  const o = {
                    [FIELDS]: [fields],
                  }
                  const value = withValueRoot(o)

                  const expectedFailureObj = withExpectedFailureObjRoot({
                    [FIELDS]: {
                      [FIELDS]: {
                        [CHILDREN]: {
                          '0': {
                            [FIELDS_FAILURE_MESSAGE]: toPayload(
                              VALIDATE_REQUIRED_KEYS,
                              fields,
                              [requiredKeys, [fieldName]]
                            ),
                          },
                        },
                      },
                    },
                  })

                  const validation = validateConstraintsConfigured(value)
                  expect(validation).toEqualFailureWithValue(expectedFailureObj)
                })
              })
            })(requiredKeys)

            describe(`more than one exclusive`, () => {
              map(keyPair => {
                const keyNames = keys(keyPair)
                describe(`${joinWithAnd(keyNames)}`, () => {
                  it(`returns a Validation.Failure with payload`, () => {
                    const o = {
                      [NAME]: value1,
                      [VALIDATOR]: func,
                      ...keyPair,
                    }

                    const value = withValueRoot({
                      [FIELDS]: [o],
                    })

                    const validation = validateConstraintsConfigured(value)

                    const pair = keys(keyPair)
                    const expectedFailureObj = withExpectedFailureObjRoot({
                      [FIELDS]: {
                        [FIELDS]: {
                          [CHILDREN]: {
                            '0': {
                              [FIELDS_FAILURE_MESSAGE]: toPayload(
                                VALIDATE_EXCLUSIVE_KEYS,
                                o,
                                [pair, pair]
                              ),
                            },
                          },
                        },
                      },
                    })

                    expect(validation).toEqualFailureWithValue(
                      expectedFailureObj
                    )
                  })
                })
              })(exclusiveKeys)
            })
          })

          // -------------------------------------------------------------------
          // 3 fields
          // -------------------------------------------------------------------

          describe(`'fields'`, () => {
            describe(`non-array value`, () => {
              it(`returns a Validation.Failure with payload`, () => {
                map(fieldValue => {
                  const value = withValueRoot({
                    [FIELDS]: fieldValue,
                  })

                  const expectedFailureObj = withExpectedFailureObjRoot({
                    [FIELDS]: {
                      [FIELDS]: toPayload(VALIDATE_IS_ARRAY, fieldValue),
                    },
                  })
                  const validation = validateConstraintsConfigured(value)
                  expect(validation).toEqualFailureWithValue(expectedFailureObj)
                }, typeData.withoutArrayValues)
              })
            })

            describe(`array containing non-object values`, () => {
              it(`returns a Validation.Failure with payload`, () => {
                map(fieldValue => {
                  const value = withValueRoot({
                    [FIELDS]: [fieldValue],
                  })
                  const validation = validateConstraintsConfigured(value)

                  const expectedFailureObj = withExpectedFailureObjRoot({
                    [FIELDS]: {
                      [FIELDS]: {
                        [CHILDREN]: {
                          '0': toPayload(VALIDATE_IS_PLAIN_OBJECT, fieldValue),
                        },
                      },
                    },
                  })

                  expect(validation).toEqualFailureWithValue(expectedFailureObj)
                })(typeData.withoutObjectValues)
              })
            })

            describe(`key values`, () => {
              map(([fieldName, validatorUID, typeDataValues]) => {
                describe(`with invalid value for '${fieldName}'`, () => {
                  it(`returns a Validation.Failure with payload`, () => {
                    map(fieldValue => {
                      const allFields = assoc(
                        fieldName,
                        fieldValue,
                        requiredFields
                      )

                      const value = withValueRoot({
                        [FIELDS_VALIDATOR]: func,
                        [FIELDS]: [allFields],
                      })

                      const expectedFailureObj = withExpectedFailureObjRoot({
                        [FIELDS]: {
                          [FIELDS]: {
                            [CHILDREN]: {
                              '0': {
                                [FIELDS]: {
                                  [fieldName]: toPayload(
                                    validatorUID,
                                    fieldValue
                                  ),
                                },
                              },
                            },
                          },
                        },
                      })

                      const validation = validateConstraintsConfigured(value)
                      expect(validation).toEqualFailureWithValue(
                        expectedFailureObj
                      )
                    }, typeDataValues)
                  })
                })
              })(fieldErrors)
            })

            // -----------------------------------------------------------------
            // 4 fieldsValidator
            // -----------------------------------------------------------------

            describe(`'fieldsValidator'`, () => {
              describe(`with non-function value`, () => {
                it(`returns a Validation.Failure with payload`, () => {
                  map(fieldValue => {
                    const value = withValueRoot({
                      [FIELDS_VALIDATOR]: fieldValue,
                      [FIELDS]: [],
                    })

                    const expectedFailureObj = withExpectedFailureObjRoot({
                      [FIELDS]: {
                        [FIELDS_VALIDATOR]: toPayload(
                          VALIDATE_IS_FUNCTION,
                          fieldValue
                        ),
                      },
                    })

                    const validation = validateConstraintsConfigured(value)
                    expect(validation).toEqualFailureWithValue(
                      expectedFailureObj
                    )
                  }, typeData.withoutFunctionValues)
                })
              })
            })

            // -----------------------------------------------------------------
            // 5 children and value
            // -----------------------------------------------------------------

            map(fieldName => {
              describe(fieldName, () => {
                describe(`empty object`, () => {
                  it(`returns a Validation.Success with supplied value`, () => {
                    const value = withValueRoot({
                      [FIELDS]: [
                        {
                          ...requiredFields,
                          [fieldName]: {},
                        },
                      ],
                    })
                    const validation = validateConstraintsConfigured(value)
                    expect(validation).toEqualSuccessWithValue(value)
                  })
                })
              })
            })([CHILDREN, VALUE])
          })
        })
      })
    },
    true
  )
})
