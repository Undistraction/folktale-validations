import {
  keys,
  map,
  without,
  assoc,
  of,
  compose,
  when,
  __,
  always,
  inc,
  ifElse,
} from 'ramda';
import { isNotNull } from 'ramda-adjunct';
import validateConstraints from '../../../constraints/validators/validateConstraints';
import { func } from '../../testHelpers/fixtures';
import typeData from '../../testHelpers/fixtures/typeData';
import { CONSTRAINT_FIELD_NAMES, FAILURE_FIELD_NAMES } from '../../../const';
import validateObjectWithConstraints from '../../../constraints/validators/validateObjectWithConstraints';
import constraints from '../../../constraints';
import validatorsWithMessages from '../../../defaults/validatorsWithMessages';
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
  invalidKeyValue,
  invalidKeyName,
} from '../../testHelpers/fixtures/constraintValues';
import { joinWithAnd, mapWithIndex, pluralise } from '../../../utils';
import levels from '../../testHelpers/levels';
import { replaceTokenWith } from '../../testHelpers/utils';
import { constraintsObjName } from '../../../messages';

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
} = CONSTRAINT_FIELD_NAMES;

const requiredKeys = [NAME, VALIDATOR];

const { FIELDS_FAILURE_MESSAGE } = FAILURE_FIELD_NAMES;

const validRequiredFields = {
  [NAME]: name1,
  [VALIDATOR]: func,
};

const exclusiveKeys = [
  {
    [DEFAULT_VALUE]: value1,
    [IS_REQUIRED]: true,
  },
  {
    [CHILDREN]: {},
    [VALUE]: {},
  },
];

const fieldErrors = [
  // [NAME, `Wasn't 'String'`, typeData.withoutStringValues],
  [VALIDATOR, `Wasn't 'Function'`, typeData.withoutFunctionValues],
  [TRANSFORMER, `Wasn't 'Function'`, typeData.withoutFunctionValues],
  [IS_REQUIRED, `Wasn't 'Boolean'`, typeData.withoutBooleanValues],
  [DEFAULT_VALUE, `Was 'Undefined'`, typeData.undefinedValues],
  [VALUE, `Wasn't 'Object'`, typeData.withoutObjectValues],
  [CHILDREN, `Wasn't 'Object'`, typeData.withoutObjectValues],
];

const requiredKeysWithout = fieldName =>
  compose(map(v => assoc(v, func, {})), without(of(fieldName)))(requiredKeys);

describe(`validateConstraints`, () => {
  const validators = validatorsWithMessages;
  const configuredContraints = constraints(validators);
  const validateConstraintsConfigured = validateConstraints(
    configuredContraints,
    validateObjectWithConstraints(validators)
  );

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
      };
      const validation = validateConstraintsConfigured(value);
      expect(validation).toEqualSuccessWithValue(value);
    });
  });

  // ---------------------------------------------------------------------------
  // Perform tests for multiple levels of nesting
  // ---------------------------------------------------------------------------

  mapWithIndex(([valueRoot, expectedRoot], index) => {
    const level = inc(index);

    const withValueRoot = when(
      always(isNotNull(valueRoot)),
      replaceTokenWith(__, valueRoot)
    );
    const withExpectedRoot = ifElse(
      always(isNotNull(expectedRoot)),
      replaceTokenWith(__, expectedRoot),
      assoc(NAME, constraintsObjName())
    );

    describe(`with ${level} constraint ${pluralise(`level`, level)}`, () => {
      // -----------------------------------------------------------------------
      // 1. Value itself
      // -----------------------------------------------------------------------
      describe(`value itself`, () => {
        describe(`with empty object`, () => {
          it(`returns a Validation.Success with supplied value`, () => {
            const value = withValueRoot({});
            const validation = validateConstraintsConfigured(value);
            expect(validation).toEqualSuccessWithValue(value);
          });
        });

        describe(`with invalid value`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(value => {
              const validation = validateConstraintsConfigured(
                withValueRoot(value)
              );

              const expectedValue = withExpectedRoot([`Wasn't 'Object'`]);

              expect(validation).toEqualFailureWithValue(expectedValue);
            }, typeData.withoutObjectValues);
          });
        });

        // ---------------------------------------------------------------------
        // 1.1 Keys
        // ---------------------------------------------------------------------

        describe(`with additional keys`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const value = withValueRoot({
              [invalidKeyName]: invalidKeyValue,
            });

            const expectedValue = withExpectedRoot({
              [FIELDS_FAILURE_MESSAGE]: [
                `Object included invalid key(s): '[${invalidKeyName}]'`,
              ],
            });

            const validation = validateConstraintsConfigured(value);
            expect(validation).toEqualFailureWithValue(expectedValue);
          });
        });

        describe(`with missing required keys`, () => {
          map(fieldName => {
            describe(fieldName, () => {
              it(`returns a Validation.Failure with message`, () => {
                const fields = requiredKeysWithout(fieldName);
                const value = withValueRoot({
                  [FIELDS]: fields,
                });

                const expectedValue = withExpectedRoot({
                  [FIELDS]: {
                    [FIELDS]: {
                      [CHILDREN]: [
                        {
                          [FIELDS_FAILURE_MESSAGE]: [
                            `Object was missing required key(s): ['${fieldName}']`,
                          ],
                        },
                      ],
                    },
                  },
                });

                const validation = validateConstraintsConfigured(value);

                expect(validation).toEqualFailureWithValue(expectedValue);
              });
            });
          })(requiredKeys);
        });

        describe(`with exclusive keys:`, () => {
          map(keyPair => {
            const keyNames = keys(keyPair);
            describe(`${joinWithAnd(keyNames)}`, () => {
              it(`returns a Validation.Failure with message`, () => {
                const value = withValueRoot({
                  [FIELDS]: [
                    {
                      [NAME]: value1,
                      [VALIDATOR]: func,
                      ...keyPair,
                    },
                  ],
                });
                const validation = validateConstraintsConfigured(value);

                const expectedValue = withExpectedRoot({
                  [FIELDS]: {
                    [FIELDS]: {
                      [CHILDREN]: [
                        {
                          [FIELDS_FAILURE_MESSAGE]: [
                            `Object had more than one exlusive key: ['${
                              keyNames[1]
                            }', '${keyNames[0]}']`,
                          ],
                        },
                      ],
                    },
                  },
                });

                expect(validation).toEqualFailureWithValue(expectedValue);
              });
            });
          })(exclusiveKeys);
        });

        describe(`with missing required keys`, () => {
          map(fieldName => {
            describe(fieldName, () => {
              it(`returns a Validation.Failure with message`, () => {
                const fields = requiredKeysWithout(fieldName);

                const value = withValueRoot({
                  [FIELDS]: fields,
                });

                const expectedValue = withExpectedRoot({
                  [FIELDS]: {
                    [FIELDS]: {
                      [CHILDREN]: [
                        {
                          [FIELDS_FAILURE_MESSAGE]: [
                            `Object was missing required key(s): ['${fieldName}']`,
                          ],
                        },
                      ],
                    },
                  },
                });

                const validation = validateConstraintsConfigured(value);

                expect(validation).toEqualFailureWithValue(expectedValue);
              });
            });
          })(requiredKeys);
        });

        // -----------------------------------------------------------------------
        // 1.2 fields
        // -----------------------------------------------------------------------

        describe(`'fields'`, () => {
          describe(`non-array value`, () => {
            it(`returns a Validation.Failure with message`, () => {
              map(fieldValue => {
                const value = withValueRoot({
                  [FIELDS]: fieldValue,
                });

                const expected = withExpectedRoot({
                  [FIELDS]: {
                    [FIELDS]: [`Wasn't 'Array'`],
                  },
                });
                const validation = validateConstraintsConfigured(value);
                expect(validation).toEqualFailureWithValue(expected);
              }, typeData.withoutArrayValues);
            });
          });

          describe(`array containing non-object values`, () => {
            it(`returns a Validation.Failure with message`, () => {
              map(fieldValue => {
                const value = withValueRoot({
                  [FIELDS]: [fieldValue],
                });
                const validation = validateConstraintsConfigured(value);

                const expected = withExpectedRoot({
                  [FIELDS]: {
                    [FIELDS]: [
                      `Array contained invalid element(s): '${fieldValue}': Wasn't 'Object'`,
                    ],
                  },
                });

                expect(validation).toEqualFailureWithValue(expected);
              })(typeData.withoutObjectValues);
            });
          });

          describe(`key values`, () => {
            map(([fieldName, expectedValidationMessage, typeDataValues]) => {
              describe(`with invalid value for '${fieldName}'`, () => {
                it(`returns a Validation.Failure with message`, () => {
                  map(fieldValue => {
                    const requiredFields = assoc(
                      fieldName,
                      fieldValue,
                      validRequiredFields
                    );

                    const value = withValueRoot({
                      [FIELDS_VALIDATOR]: func,
                      [FIELDS]: [requiredFields],
                    });

                    const expected = withExpectedRoot({
                      [FIELDS]: {
                        [FIELDS]: {
                          [CHILDREN]: [
                            {
                              [FIELDS]: {
                                [fieldName]: [expectedValidationMessage],
                              },
                            },
                          ],
                        },
                      },
                    });

                    const validation = validateConstraintsConfigured(value);
                    expect(validation).toEqualFailureWithValue(expected);
                  }, typeDataValues);
                });
              });
            })(fieldErrors);
          });

          // -------------------------------------------------------------------
          // 1.3 fieldsValidator
          // -------------------------------------------------------------------

          describe(`'fieldsValidator'`, () => {
            describe(`with non-function value`, () => {
              it(`returns a Validation.Failure with message`, () => {
                map(fieldValue => {
                  const value = withValueRoot({
                    [FIELDS_VALIDATOR]: fieldValue,
                    [FIELDS]: [],
                  });

                  const expected = withExpectedRoot({
                    [FIELDS]: {
                      [FIELDS_VALIDATOR]: [`Wasn't 'Function'`],
                    },
                  });

                  const validation = validateConstraintsConfigured(value);
                  expect(validation).toEqualFailureWithValue(expected);
                }, typeData.withoutFunctionValues);
              });
            });
          });

          // -------------------------------------------------------------------
          // 1.4 children and value
          // -------------------------------------------------------------------

          map(fieldName => {
            describe(fieldName, () => {
              describe(`empty object`, () => {
                it(`returns a Validation.Success with supplied value`, () => {
                  const value = withValueRoot({
                    [FIELDS]: [
                      {
                        ...validRequiredFields,
                        [fieldName]: {},
                      },
                    ],
                  });
                  const validation = validateConstraintsConfigured(value);
                  expect(validation).toEqualSuccessWithValue(value);
                });
              });
            });
          })([CHILDREN, VALUE]);
        });
      });
    });
  })(levels);
});
