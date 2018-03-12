import { map } from 'ramda'
import { validateObjectWithConstraints } from '../../../index'
import {
  stubReturnsSuccess,
  stubReturnsFailure,
  spy,
  stubReturns,
} from '../../testHelpers/sinon'
import FAILURE_FIELD_NAMES from '../../../const/failureFieldNames'
import CONSTRAINT_FIELD_NAMES from '../../../const/constraintFieldNames'
import {
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  value7,
  value8,
  value9,
  invalidKeyValue,
  invalidKeyName,
  key1,
  key2,
  key3,
  key4,
  key5,
  key6,
  key7,
  key8,
  key9,
  key10,
  key11,
  key12,
  transformedValue1,
  transformedValue2,
  defaultValue1,
  defaultValue2,
  payload1,
  payload3,
  funcWhichThrows,
} from '../../testHelpers/fixtures/generic'
import toPayload from '../../../failures/toPayload'
import {
  VALIDATE_REQUIRED_KEYS,
  VALIDATE_WHITELISTED_KEYS,
  VALIDATE_IS_PLAIN_OBJECT,
} from '../../../const/validatorUids'
import testLevels from '../../testHelpers/testLevels'
import validateObjectWithConstraintsLevels from '../../testHelpers/data/validateObjectWithConstraintsLevels'
import { pluralise } from '../../../utils/formatting'
import typeData from '../../testHelpers/fixtures/typeData'

const {
  FIELDS,
  FIELDS_VALIDATOR,
  NAME,
  VALIDATOR,
  TRANSFORMER,
  IS_REQUIRED,
  WHITELIST_KEYS,
  DEFAULT_VALUE,
  VALUE,
  CHILDREN,
} = CONSTRAINT_FIELD_NAMES

const { FIELDS_FAILURE_MESSAGE, SCOPE } = FAILURE_FIELD_NAMES

// Note: No need to test the validity of the constraints object itself as this
// is well tested in `validateConstraints.js`. These tests should validate that
// given a valid constraint object, the constraints are applied correctly.

describe(`validateObjectWithConstraints`, () => {
  // ---------------------------------------------------------------------------
  // Full nested constraint object with all features
  // ---------------------------------------------------------------------------

  describe(`with an object that satisfies constraints`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const v1 = stubReturnsSuccess(value1)
      const spyNotCalled1 = spy()
      const spyNotCalled2 = spy()
      const spyNotCalled3 = spy()
      const v3 = stubReturnsSuccess(value3)
      const v5 = stubReturnsSuccess(value5)
      const v6 = stubReturnsSuccess(value6)
      const v7 = stubReturnsSuccess(value7)
      const v8 = stubReturnsSuccess(value8)
      const t1 = stubReturns(transformedValue1)
      const t2 = stubReturns(transformedValue2)
      const o = {
        [key1]: value1,
        [key2]: value3,
        [key3]: [
          {
            [key4]: value4,
            [key5]: value8,
          },
          {
            [key4]: value4,
            [key5]: value8,
            [key6]: value9,
          },
        ],
        [key7]: {
          [key8]: value2,
        },
      }

      const constraints = {
        [FIELDS]: [
          {
            [NAME]: key1,
            [VALIDATOR]: v1,
            [IS_REQUIRED]: true,
            [TRANSFORMER]: t1, // Value should be transformed
          },
          {
            [NAME]: key9,
            [VALIDATOR]: spyNotCalled1,
          },
          {
            [NAME]: key2,
            [VALIDATOR]: v3,
            [DEFAULT_VALUE]: defaultValue1,
          },
          {
            [NAME]: key10,
            [VALIDATOR]: spyNotCalled1, // Not run because no value
            [DEFAULT_VALUE]: value2, // Should be applied instead
          },
          {
            [NAME]: key11,
            [VALIDATOR]: spyNotCalled1, // Not run because no value
            [DEFAULT_VALUE]: defaultValue1, // Should be applied instead
          },
          {
            [NAME]: key7,
            [VALIDATOR]: v7,
            [VALUE]: {
              [FIELDS]: [
                {
                  [NAME]: key8,
                  [VALIDATOR]: v6,
                },
              ],
            },
          },
          {
            [NAME]: key3,
            [VALIDATOR]: v5,
            [CHILDREN]: {
              [FIELDS]: [
                {
                  [NAME]: key4,
                  [VALIDATOR]: v5,
                  [IS_REQUIRED]: true,
                },
                {
                  [NAME]: key5,
                  [VALIDATOR]: v8,
                  [TRANSFORMER]: t2,
                  [IS_REQUIRED]: true,
                },
                {
                  [NAME]: key6,
                  [VALIDATOR]: v8,
                  [DEFAULT_VALUE]: defaultValue2,
                },
              ],
            },
          },
          {
            [NAME]: key12,
            [VALIDATOR]: spyNotCalled2,
            [TRANSFORMER]: spyNotCalled3, // Transformer should not be called
          },
        ],
      }

      const expectedFailureObj = {
        [key1]: transformedValue1,
        [key2]: value3,
        [key3]: [
          {
            [key4]: value4,
            [key5]: transformedValue2,
            [key6]: defaultValue2,
          },
          {
            [key4]: value4,
            [key5]: transformedValue2,
            [key6]: value9,
          },
        ],
        [key7]: {
          [key8]: value2,
        },
        [key10]: value2,
        [key11]: defaultValue1,
      }

      const validator = validateObjectWithConstraints(constraints)
      const validation = validator(o)

      expect(validation).toEqualSuccessWithValue(expectedFailureObj)
      expect(t1.calledWith(value1)).toBeTrue()
      expect(t2.calledWith(value8)).toBeTrue()
      expect(v1.calledWith(value1)).toBeTrue()
      expect(v3.calledWith(value3)).toBeTrue()
      expect(v5.calledWith(value4)).toBeTrue()
      expect(spyNotCalled1.notCalled).toBeTrue()
      expect(spyNotCalled2.notCalled).toBeTrue()
      expect(spyNotCalled3.notCalled).toBeTrue()
    })
  })

  // ---------------------------------------------------------------------------
  // Invalid Constraint Obj
  // ---------------------------------------------------------------------------
  describe(`with invalid constraints object`, () => {
    it(`returns a Validation.Failure with payload`, () => {
      const value = {}

      const constraints = {
        [invalidKeyName]: value1,
      }

      const expectedFailureObj = {
        [SCOPE]: {
          name: `Constraints`,
        },
        [FIELDS_FAILURE_MESSAGE]: toPayload(
          VALIDATE_WHITELISTED_KEYS,
          constraints,
          [[FIELDS_VALIDATOR, FIELDS, WHITELIST_KEYS], [invalidKeyName]]
        ),
      }

      const validator = validateObjectWithConstraints(constraints)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue(expectedFailureObj)
    })
  })

  // ---------------------------------------------------------------------------
  // Perform tests for multiple levels of nesting
  // ---------------------------------------------------------------------------

  testLevels(
    validateObjectWithConstraintsLevels,
    (
      level,
      { withValueRoot, withConstraintsRoot, withExpectedFailureObjRoot }
    ) => {
      describe(`with ${level} object ${pluralise(`level`, level)}`, () => {
        // ---------------------------------------------------------------------
        // 1. Value Itself
        // ---------------------------------------------------------------------
        describe(`value itself`, () => {
          const v1 = stubReturnsSuccess(value1)
          const constraints = withConstraintsRoot({
            [FIELDS]: [
              {
                [NAME]: value1,
                [VALIDATOR]: v1,
              },
              {
                [NAME]: value2,
                [VALIDATOR]: v1,
              },
            ],
          })
          const validator = validateObjectWithConstraints(constraints)

          describe(`empty object`, () => {
            it(`returns a Validation.Success with message`, () => {
              const value = withValueRoot({})

              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(value)
              expect(v1.notCalled).toBeTrue()
            })
          })

          describe(`with invalid value`, () => {
            it(`returns a Validation.Failure with payload`, () => {
              map(invalidValue => {
                const value = withValueRoot(invalidValue)
                const validation = validator(value)

                const expectedFailureObj = withExpectedFailureObjRoot(
                  toPayload(VALIDATE_IS_PLAIN_OBJECT, invalidValue)
                )

                expect(validation).toEqualFailureWithValue(expectedFailureObj)
              }, typeData.withoutObjectValues)
            })
          })
        })

        // ---------------------------------------------------------------------
        // 2. Values
        // ---------------------------------------------------------------------

        describe(`values`, () => {
          describe(`that don't satisfy constraints`, () => {
            describe(`with invalid values`, () => {
              it(`returns a Validation.Failure with payload`, () => {
                const v1 = stubReturnsFailure(payload1)
                const v2 = stubReturnsSuccess()
                const v3 = stubReturnsFailure(payload3)
                const o = withValueRoot({
                  [key1]: value1,
                  [key2]: value2,
                  [key3]: value3,
                })

                const constraints = withConstraintsRoot({
                  [FIELDS]: [
                    {
                      [NAME]: key1,
                      [VALIDATOR]: v1,
                    },
                    {
                      [NAME]: key2,
                      [VALIDATOR]: v2,
                    },
                    {
                      [NAME]: key3,
                      [VALIDATOR]: v3,
                    },
                  ],
                })

                const expectedFailureObj = withExpectedFailureObjRoot({
                  [FIELDS]: {
                    [key1]: payload1,
                    [key3]: payload3,
                  },
                })

                const validator = validateObjectWithConstraints(constraints)
                const validation = validator(o)
                expect(validation).toEqualFailureWithValue(expectedFailureObj)
                expect(v1.calledWith(value1)).toBeTrue()
              })
            })
          })

          describe(`with name that is regexp`, () => {
            describe(`no matches`, () => {
              it(`returns a Validation.Success with expected value`, () => {
                const v1 = stubReturnsSuccess()

                const constraints = withConstraintsRoot({
                  [WHITELIST_KEYS]: false,
                  [FIELDS]: [
                    {
                      [NAME]: /xxx/,
                      [VALIDATOR]: v1,
                    },
                  ],
                })

                const o = {
                  [key1]: value1,
                  [key2]: value2,
                  [key3]: value3,
                }
                const value = withValueRoot(o)
                const validator = validateObjectWithConstraints(constraints)
                const validation = validator(value)
                expect(validation).toEqualSuccessWithValue(value)
                expect(v1.notCalled).toBeTrue()
              })
            })

            describe(`some arbitrary fields`, () => {
              it(`returns a Validation.Success with expected value`, () => {
                const v1 = stubReturnsSuccess()

                const constraints = withConstraintsRoot({
                  [WHITELIST_KEYS]: false,
                  [FIELDS]: [
                    {
                      [NAME]: /key.*/,
                      [VALIDATOR]: v1,
                    },
                  ],
                })

                const o = {
                  [key1]: value1,
                  a: value2,
                  [key3]: value3,
                }
                const value = withValueRoot(o)
                const validator = validateObjectWithConstraints(constraints)
                const validation = validator(value)
                expect(validation).toEqualSuccessWithValue(value)
                expect(v1.args).toEqual([[value1], [value3]])
              })
            })

            describe(`all arbitrary fields`, () => {
              it(`returns a Validation.Success with expected value`, () => {
                const v1 = stubReturnsSuccess()

                const constraints = withConstraintsRoot({
                  [WHITELIST_KEYS]: false,
                  [FIELDS]: [
                    {
                      [NAME]: /.*/,
                      [VALIDATOR]: v1,
                    },
                  ],
                })

                const o = {
                  [key1]: value1,
                  [key2]: value2,
                  [key3]: value3,
                }
                const value = withValueRoot(o)
                const validator = validateObjectWithConstraints(constraints)
                const validation = validator(value)
                expect(validation).toEqualSuccessWithValue(value)
                expect(v1.args).toEqual([[value1], [value2], [value3]])
              })
            })

            describe(`mixed arbitrary and non-arbitrary fields`, () => {
              it(`returns a Validation.Success with expected value`, () => {
                const v1 = stubReturnsSuccess()
                const v2 = stubReturnsSuccess()

                const constraints = withConstraintsRoot({
                  [WHITELIST_KEYS]: false,
                  [FIELDS]: [
                    {
                      [NAME]: /.*/,
                      [VALIDATOR]: v1,
                    },
                    {
                      [NAME]: key2,
                      [VALIDATOR]: v2,
                    },
                  ],
                })

                const o = {
                  [key1]: value1,
                  [key2]: value2,
                  [key3]: value3,
                }
                const value = withValueRoot(o)
                const validator = validateObjectWithConstraints(constraints)
                const validation = validator(value)
                expect(validation).toEqualSuccessWithValue(value)
                expect(v1.calledTwice).toBeTrue()
                expect(v1.args).toEqual([[value1], [value3]])
                expect(v2.calledOnce).toBeTrue()
                expect(v2.calledWith(value2)).toBeTrue()
              })
            })
          })
        })

        // ---------------------------------------------------------------------
        // 3. Keys
        // ---------------------------------------------------------------------
        describe(`keys`, () => {
          describe(`additional`, () => {
            describe(`whitelisted`, () => {
              describe(`default`, () => {
                it(`returns a Validation.Failure with payload`, () => {
                  const v1 = spy()
                  const v2 = spy()
                  const o = {
                    [key1]: value1,
                    [key2]: value2,
                    [invalidKeyName]: invalidKeyValue,
                  }
                  const value = withValueRoot(o)

                  const constraints = withConstraintsRoot({
                    [FIELDS]: [
                      {
                        [NAME]: key1,
                        [VALIDATOR]: v1,
                        [IS_REQUIRED]: true,
                      },
                      {
                        [NAME]: key2,
                        [VALIDATOR]: v2,
                        [IS_REQUIRED]: true,
                      },
                    ],
                  })

                  const expectedFailureObj = withExpectedFailureObjRoot({
                    [FIELDS_FAILURE_MESSAGE]: toPayload(
                      VALIDATE_WHITELISTED_KEYS,
                      o,
                      [[key1, key2], [invalidKeyName]]
                    ),
                  })

                  const validator = validateObjectWithConstraints(constraints)
                  const validation = validator(value)
                  expect(validation).toEqualFailureWithValue(expectedFailureObj)
                  expect(v1.notCalled).toBeTrue()
                  expect(v2.notCalled).toBeTrue()
                })
              })

              describe(`explicit`, () => {
                it(`returns a Validation.Failure with payload`, () => {
                  const v1 = spy()
                  const v2 = spy()
                  const o = {
                    [key1]: value1,
                    [key2]: value2,
                    [invalidKeyName]: invalidKeyValue,
                  }
                  const value = withValueRoot(o)

                  const constraints = withConstraintsRoot({
                    [WHITELIST_KEYS]: true,
                    [FIELDS]: [
                      {
                        [NAME]: key1,
                        [VALIDATOR]: v1,
                        [IS_REQUIRED]: true,
                      },
                      {
                        [NAME]: key2,
                        [VALIDATOR]: v2,
                        [IS_REQUIRED]: true,
                      },
                    ],
                  })

                  const expectedFailureObj = withExpectedFailureObjRoot({
                    [FIELDS_FAILURE_MESSAGE]: toPayload(
                      VALIDATE_WHITELISTED_KEYS,
                      o,
                      [[key1, key2], [invalidKeyName]]
                    ),
                  })

                  const validator = validateObjectWithConstraints(constraints)
                  const validation = validator(value)
                  expect(validation).toEqualFailureWithValue(expectedFailureObj)
                  expect(v1.notCalled).toBeTrue()
                  expect(v2.notCalled).toBeTrue()
                })
              })
            })

            describe(`with whitelist disabled`, () => {
              it(`returns a Validation.Failure with payload`, () => {
                const v1 = stubReturnsSuccess(value1)
                const v2 = stubReturnsSuccess(value2)
                const o = {
                  [key1]: value1,
                  [key2]: value2,
                  [invalidKeyName]: invalidKeyValue,
                }
                const value = withValueRoot(o)

                const constraints = withConstraintsRoot({
                  [WHITELIST_KEYS]: false,
                  [FIELDS]: [
                    {
                      [NAME]: key1,
                      [VALIDATOR]: v1,
                      [IS_REQUIRED]: true,
                    },
                    {
                      [NAME]: key2,
                      [VALIDATOR]: v2,
                      [IS_REQUIRED]: true,
                    },
                  ],
                })

                const validator = validateObjectWithConstraints(constraints)
                const validation = validator(value)
                expect(validation).toEqualSuccessWithValue(value)
              })
            })
          })

          describe(`missing required`, () => {
            it(`returns a Validation.Failure with payload`, () => {
              const v1 = spy()
              const v2 = spy()
              const o = {
                [key1]: value1,
              }
              const value = withValueRoot(o)

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                    [IS_REQUIRED]: true,
                  },
                  {
                    [NAME]: key2,
                    [VALIDATOR]: v2,
                    [IS_REQUIRED]: true,
                  },
                ],
              })

              const expectedFailureObj = withExpectedFailureObjRoot({
                [FIELDS_FAILURE_MESSAGE]: toPayload(VALIDATE_REQUIRED_KEYS, o, [
                  [key1, key2],
                  [key2],
                ]),
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualFailureWithValue(expectedFailureObj)
              expect(v1.notCalled).toBeTrue()
              expect(v2.notCalled).toBeTrue()
            })
          })
        })

        describe(`with custom fields validator`, () => {
          describe(`which succeeds`, () => {
            it(`returns a Validation.Success with value`, () => {
              const o = {
                [key1]: value1,
              }
              const value = withValueRoot(o)
              const v1 = stubReturnsSuccess(value)
              const v2 = stubReturnsSuccess()

              const constraints = withConstraintsRoot({
                [FIELDS_VALIDATOR]: v1,
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v2,
                    [IS_REQUIRED]: false,
                  },
                ],
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(value)
              expect(v1.calledWith(o)).toBeTrue()
            })
          })

          describe(`which fails`, () => {
            it(`returns a Validation.Failure with payload`, () => {
              const o = {
                [key1]: value1,
              }
              const value = withValueRoot(o)
              const v1 = stubReturnsFailure(payload1)
              const v2 = stubReturnsSuccess()

              const constraints = withConstraintsRoot({
                [FIELDS_VALIDATOR]: v1,
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v2,
                    [IS_REQUIRED]: false,
                  },
                ],
              })

              const expectedFailureObj = withExpectedFailureObjRoot({
                [FIELDS_FAILURE_MESSAGE]: payload1,
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualFailureWithValue(expectedFailureObj)
              expect(v1.calledWith(o)).toBeTrue()
            })
          })
        })
        // ---------------------------------------------------------------------
        // 4. Children
        // ---------------------------------------------------------------------

        describe(`children`, () => {
          describe(`empty array`, () => {
            it(`returns a Validation.Success with supplied value`, () => {
              const o = {
                [key1]: [],
              }
              const value = withValueRoot(o)
              const v1 = stubReturnsSuccess(value)
              const v2 = stubReturnsSuccess()

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                    [CHILDREN]: {
                      [FIELDS]: [
                        {
                          [NAME]: key2,
                          [VALIDATOR]: v2,
                        },
                      ],
                    },
                  },
                ],
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(value)
              expect(v1.calledWith([])).toBeTrue()
              expect(v2.notCalled).toBeTrue()
            })
          })

          describe(`valid value`, () => {
            it(`returns a Validation.Success with supplied value`, () => {
              const o = {
                [key1]: [{ key2: value1 }, { key2: value2 }],
              }
              const value = withValueRoot(o)
              const v1 = stubReturnsSuccess(value)
              const v2 = stubReturnsSuccess(value1)

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                    [CHILDREN]: {
                      [FIELDS]: [
                        {
                          [NAME]: key2,
                          [VALIDATOR]: v2,
                        },
                      ],
                    },
                  },
                ],
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(value)
              expect(v2.calledWith(value1)).toBeTrue()
              expect(v2.calledWith(value2)).toBeTrue()
            })
          })

          describe(`invalid values`, () => {
            describe(`invalid key`, () => {
              it(`returns a Validation.Success with supplied value`, () => {
                const o = {
                  [key1]: [
                    { key2: value1 },
                    { key2: value2 },
                    { key3: value3 },
                  ],
                }
                const value = withValueRoot(o)
                const v1 = stubReturnsSuccess(value)
                const v2 = stubReturnsSuccess(value1)

                const constraints = withConstraintsRoot({
                  [FIELDS]: [
                    {
                      [NAME]: key1,
                      [VALIDATOR]: v1,
                      [CHILDREN]: {
                        [FIELDS]: [
                          {
                            [NAME]: key2,
                            [VALIDATOR]: v2,
                          },
                        ],
                      },
                    },
                  ],
                })

                const expectedFailureObj = withExpectedFailureObjRoot({
                  [FIELDS]: {
                    [key1]: {
                      [CHILDREN]: {
                        '2': {
                          [FIELDS_FAILURE_MESSAGE]: toPayload(
                            VALIDATE_WHITELISTED_KEYS,
                            {
                              key3: value3,
                            },
                            [[key2], [key3]]
                          ),
                        },
                      },
                    },
                  },
                })

                const validator = validateObjectWithConstraints(constraints)
                const validation = validator(value)
                expect(validation).toEqualFailureWithValue(expectedFailureObj)
                expect(v2.calledWith(value1)).toBeTrue()
                expect(v2.calledTwice).toBeTrue()
              })
            })
          })
        })
        // ---------------------------------------------------------------------
        // 5. Value
        // ---------------------------------------------------------------------

        describe(`value`, () => {
          describe(`empty object`, () => {
            it(`returns a Validation.Success with supplied value`, () => {
              const value = withValueRoot({
                [key1]: {},
              })
              const v1 = stubReturnsSuccess(value)
              const v2 = stubReturnsSuccess()

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                    [VALUE]: {
                      [FIELDS]: [
                        {
                          [NAME]: key2,
                          [VALIDATOR]: v2,
                        },
                      ],
                    },
                  },
                ],
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(value)
              expect(v1.calledWith({})).toBeTrue()
              expect(v2.notCalled).toBeTrue()
            })
          })

          describe(`valid value`, () => {
            it(`returns a Validation.Success with supplied value`, () => {
              const value = withValueRoot({
                [key1]: { key2: value1 },
              })
              const v1 = stubReturnsSuccess(value)
              const v2 = stubReturnsSuccess(value1)

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                    [VALUE]: {
                      [FIELDS]: [
                        {
                          [NAME]: key2,
                          [VALIDATOR]: v2,
                        },
                      ],
                    },
                  },
                ],
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(value)
              expect(v2.calledWith(value1)).toBeTrue()
            })

            describe(`object with only default values`, () => {
              it(`returns a Validation.Success with supplied value`, () => {
                const value = withValueRoot({
                  [key1]: {},
                })
                const v1 = stubReturnsSuccess(value)
                const v2 = stubReturnsSuccess(value1)

                const constraints = withConstraintsRoot({
                  [FIELDS]: [
                    {
                      [NAME]: key1,
                      [VALIDATOR]: v1,
                      [VALUE]: {
                        [FIELDS]: [
                          {
                            [NAME]: key2,
                            [VALIDATOR]: v2,
                            [DEFAULT_VALUE]: value2,
                          },
                        ],
                      },
                    },
                  ],
                })

                const expectedValue = withValueRoot({
                  [key1]: {
                    [key2]: value2,
                  },
                })
                const validator = validateObjectWithConstraints(constraints)
                const validation = validator(value)
                expect(validation).toEqualSuccessWithValue(expectedValue)
                expect(v2.notCalled).toBeTrue()
              })
            })
          })
        })

        // ---------------------------------------------------------------------
        // 6. Default Values
        // ---------------------------------------------------------------------
        describe(`default values`, () => {
          describe(`when no value is supplied`, () => {
            it(`returns a Validation.Success with default value applied`, () => {
              const value = withValueRoot({
                key1: value1,
              })
              const v1 = stubReturnsSuccess(value1)
              const v2 = spy()

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                  },
                  {
                    [NAME]: key2,
                    [VALIDATOR]: v2,
                    [DEFAULT_VALUE]: defaultValue2,
                  },
                ],
              })

              const expectedValue = withValueRoot({
                [key1]: value1,
                [key2]: defaultValue2,
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(expectedValue)
              expect(v1.calledWith(value1)).toBeTrue()
              expect(v2.notCalled).toBeTrue()
            })
          })

          describe(`when a value is supplied`, () => {
            it(`returns a Validation.Success without default value applied`, () => {
              const value = withValueRoot({
                key1: value1,
                key2: value2,
              })
              const v1 = stubReturnsSuccess(value1)
              const v2 = stubReturnsSuccess(value2)

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                  },
                  {
                    [NAME]: key2,
                    [VALIDATOR]: v2,
                    [DEFAULT_VALUE]: defaultValue2,
                  },
                ],
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(value)
              expect(v1.calledWith(value1)).toBeTrue()
              expect(v2.calledWith(value2)).toBeTrue()
            })
          })
        })

        // ---------------------------------------------------------------------
        // 7. Transformed Values
        // ---------------------------------------------------------------------

        describe(`transformed values`, () => {
          describe(`when transformer throws an error`, () => {
            it(`throws an error with a helpful message`, () => {
              const value = withValueRoot({
                key1: value1,
              })
              const v1 = stubReturnsSuccess(value1)

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                    [TRANSFORMER]: funcWhichThrows,
                  },
                ],
              })

              const validator = validateObjectWithConstraints(constraints)
              expect(() => validator(value)).toThrow(
                `[validator] A transformer threw an error for prop name: 'key1' with value 'value1'`
              )
            })
          })

          describe(`when no value is supplied`, () => {
            it(`returns a Validation.Success without transform`, () => {
              const value = withValueRoot({
                key1: value1,
              })
              const v1 = stubReturnsSuccess(value1)
              const v2 = spy()
              const t1 = spy()

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                  },
                  {
                    [NAME]: key2,
                    [VALIDATOR]: v2,
                    [TRANSFORMER]: t1,
                  },
                ],
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(value)
              expect(v1.calledWith(value1)).toBeTrue()
              expect(v2.notCalled).toBeTrue()
              expect(t1.notCalled).toBeTrue()
            })
          })

          describe(`when a value is supplied`, () => {
            it(`returns a Validation.Success with transform`, () => {
              const value = withValueRoot({
                key1: value1,
                key2: value2,
              })
              const v1 = stubReturnsSuccess(value1)
              const v2 = stubReturnsSuccess(value2)
              const t1 = stubReturns(transformedValue1)

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                  },
                  {
                    [NAME]: key2,
                    [VALIDATOR]: v2,
                    [TRANSFORMER]: t1,
                  },
                ],
              })

              const expectedValue = withValueRoot({
                key1: value1,
                key2: transformedValue1,
              })

              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(expectedValue)
              expect(v1.calledWith(value1)).toBeTrue()
              expect(v2.calledWith(value2)).toBeTrue()
              expect(t1.calledWith(value2)).toBeTrue()
            })
          })

          describe(`when a default value and transform are supplied`, () => {
            it(`returns a Validation.Success with the default value`, () => {
              const value = withValueRoot({})
              const v1 = stubReturnsSuccess(value1)
              const t1 = stubReturns(transformedValue1)

              const constraints = withConstraintsRoot({
                [FIELDS]: [
                  {
                    [NAME]: key1,
                    [VALIDATOR]: v1,
                    [TRANSFORMER]: t1,
                    [DEFAULT_VALUE]: defaultValue1,
                  },
                ],
              })

              const expectedValue = withValueRoot({
                key1: transformedValue1,
              })
              const validator = validateObjectWithConstraints(constraints)
              const validation = validator(value)
              expect(validation).toEqualSuccessWithValue(expectedValue)
              expect(v1.notCalled).toBeTrue()
              expect(t1.calledWith(defaultValue1)).toBeTrue()
            })
          })
        })
      })
    }
  )
})
