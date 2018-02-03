import { keys, map, without, assoc, of, compose } from 'ramda';

import validateConstraints from '../../../constraints/validators/validateConstraints';
import { func } from '../../testHelpers/fixtures';
import typeData from '../../testHelpers/fixtures/typeData';
import { CONSTRAINT_FIELD_NAMES, FAILURE_FIELD_NAMES } from '../../../const';
import validateObjectWithConstraints from '../../../constraints/validators/validateObjectWithConstraints';
import constraints from '../../../constraints';
import validatorsWithMessages from '../../../defaults/validatorsWithMessages';
import { constraintsObjPrefix } from '../../../messages';
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
  name2,
  invalidKeyValue,
  invalidKeyName,
} from '../../testHelpers/fixtures/constraintValues';
import { joinWithAnd } from '../../../utils';

const CONSTRAINTS = constraintsObjPrefix();

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
    it.only(`returns a Validation.Success with supplied value`, () => {
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

    describe(`empty values`, () => {
      describe(`with empty children object`, () => {
        it.only(`returns a Validation.Success with supplied`, () => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [CHILDREN]: {},
              },
            ],
          };
          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualSuccessWithValue(value);
        });
      });

      describe(`with empty value object`, () => {
        it.only(`returns a Validation.Success with supplied`, () => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [VALUE]: {},
              },
            ],
          };
          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualSuccessWithValue(value);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // One level of constraints
  // ---------------------------------------------------------------------------

  describe(`with one level of constraints`, () => {
    describe(`with empty constraint object`, () => {
      it.only(`returns a Validation.Success with supplied value`, () => {
        const value = {};
        const validation = validateConstraintsConfigured(value);
        expect(validation).toEqualSuccessWithValue(value);
      });
    });

    describe(`with invalid constraints`, () => {
      describe(`with invalid value`, () => {
        it.only(`returns a Validation.Failure with message`, () => {
          map(value => {
            const validation = validateConstraintsConfigured(value);

            const expectedValue = {
              [CONSTRAINTS]: [`Wasn't 'Object'`],
            };

            expect(validation).toEqualFailureWithValue(expectedValue);
          }, typeData.withoutObjectValues);
        });
      });

      describe(`with additional keys`, () => {
        it.only(`returns a Validation.Failure with message`, () => {
          const value = {
            [invalidKeyName]: invalidKeyValue,
          };

          const expectedValue = {
            [CONSTRAINTS]: {
              [FIELDS_FAILURE_MESSAGE]: [
                `Object included invalid key(s): '[${invalidKeyName}]'`,
              ],
            },
          };

          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualFailureWithValue(expectedValue);
        });
      });

      describe(`with exclusive keys:`, () => {
        map(keyPair => {
          const keyNames = keys(keyPair);
          describe(`${joinWithAnd(keyNames)}`, () => {
            it.only(`returns a Validation.Failure with message`, () => {
              const value = {
                [FIELDS]: [
                  {
                    [NAME]: value1,
                    [VALIDATOR]: func,
                    ...keyPair,
                  },
                ],
              };
              const validation = validateConstraintsConfigured(value);

              const expectedValue = {
                [CONSTRAINTS]: {
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
                },
              };

              expect(validation).toEqualFailureWithValue(expectedValue);
            });
          });
        })(exclusiveKeys);
      });

      describe(`with missing requried keys`, () => {
        map(fieldName => {
          describe(fieldName, () => {
            it.only(`returns a Validation.Failure with message`, () => {
              const fields = requiredKeysWithout(fieldName);

              const value = {
                [FIELDS]: fields,
              };

              const expectedValue = {
                [CONSTRAINTS]: {
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
                },
              };

              const validation = validateConstraintsConfigured(value);

              expect(validation).toEqualFailureWithValue(expectedValue);
            });
          });
        })(requiredKeys);
      });

      describe(`with invalid field values`, () => {
        describe(`with non-array value for 'fields'`, () => {
          it.only(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                [FIELDS]: fieldValue,
              };

              const expected = {
                [CONSTRAINTS]: {
                  [FIELDS]: {
                    [FIELDS]: [`Wasn't 'Array'`],
                  },
                },
              };
              const validation = validateConstraintsConfigured(value);
              expect(validation).toEqualFailureWithValue(expected);
            }, typeData.withoutArrayValues);
          });
        });

        describe(`with 'fields' array containing non-object values`, () => {
          it.only(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                [FIELDS]: [fieldValue],
              };
              const validation = validateConstraintsConfigured(value);

              const expected = {
                [CONSTRAINTS]: {
                  [FIELDS]: {
                    [FIELDS]: [
                      `Array contained invalid element(s): '${fieldValue}': Wasn't 'Object'`,
                    ],
                  },
                },
              };

              expect(validation).toEqualFailureWithValue(expected);
            })(typeData.withoutObjectValues);
          });
        });

        describe(`with non-function value for 'fieldsValidator'`, () => {
          it.only(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                [FIELDS_VALIDATOR]: fieldValue,
                [FIELDS]: [],
              };

              const expected = {
                [CONSTRAINTS]: {
                  [FIELDS]: {
                    [FIELDS_VALIDATOR]: [`Wasn't 'Function'`],
                  },
                },
              };

              const validation = validateConstraintsConfigured(value);
              expect(validation).toEqualFailureWithValue(expected);
            }, typeData.withoutFunctionValues);
          });
        });

        describe(`for fields array values`, () => {
          map(([fieldName, expectedValidationMessage, typeDataValues]) => {
            describe(`with invalid value for '${fieldName}'`, () => {
              it.only(`returns a Validation.Failure with message`, () => {
                map(fieldValue => {
                  const requiredFields = assoc(
                    fieldName,
                    fieldValue,
                    validRequiredFields
                  );

                  const value = {
                    [FIELDS_VALIDATOR]: func,
                    [FIELDS]: [requiredFields],
                  };

                  const expected = {
                    [CONSTRAINTS]: {
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
                    },
                  };

                  const validation = validateConstraintsConfigured(value);
                  expect(validation).toEqualFailureWithValue(expected);
                }, typeDataValues);
              });
            });
          })(fieldErrors);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // With two levels of constraints
  // ---------------------------------------------------------------------------

  describe(`with two levels of constraints`, () => {
    describe(`with valid constraints`, () => {
      describe(`empty values`, () => {
        describe(`children`, () => {
          it.only(`returns a Validation.Success with supplied`, () => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: name1,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: name2,
                        [VALIDATOR]: func,
                        [CHILDREN]: {},
                      },
                    ],
                  },
                },
              ],
            };
            const validation = validateConstraintsConfigured(value);
            expect(validation).toEqualSuccessWithValue(value);
          });
        });

        describe(`object`, () => {
          it.only(`returns a Validation.Success with supplied`, () => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: name1,
                  [VALIDATOR]: func,
                  [VALUE]: {
                    [FIELDS]: [
                      {
                        [NAME]: name2,
                        [VALIDATOR]: func,
                        [VALUE]: {},
                      },
                    ],
                  },
                },
              ],
            };
            const validation = validateConstraintsConfigured(value);
            expect(validation).toEqualSuccessWithValue(value);
          });
        });
      });
    });

    describe(`with invalid constraints`, () => {
      describe(`with invalid values`, () => {
        describe(`for children`, () => {
          it.only(`returns a Validation.Failure with message`, () => {
            map(invalidValue => {
              const value = {
                [FIELDS]: [
                  {
                    [NAME]: name1,
                    [VALIDATOR]: func,
                    [CHILDREN]: {
                      [FIELDS]: [
                        {
                          [NAME]: name2,
                          [VALIDATOR]: func,
                          [CHILDREN]: invalidValue,
                        },
                      ],
                    },
                  },
                ],
              };

              const expectedValue = {
                [CONSTRAINTS]: {
                  [FIELDS]: {
                    [FIELDS]: {
                      [CHILDREN]: [
                        {
                          [FIELDS]: {
                            [CHILDREN]: {
                              [FIELDS]: {
                                [FIELDS]: {
                                  [CHILDREN]: [
                                    {
                                      [FIELDS]: {
                                        [CHILDREN]: [`Wasn't 'Object'`],
                                      },
                                    },
                                  ],
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              };

              const validation = validateConstraintsConfigured(value);

              expect(validation).toEqualFailureWithValue(expectedValue);
            }, typeData.withoutObjectValues);
          });

          describe(`for value`, () => {
            it.only(`returns a Validation.Failure with message`, () => {
              map(invalidValue => {
                const value = {
                  [FIELDS]: [
                    {
                      [NAME]: name1,
                      [VALIDATOR]: func,
                      [CHILDREN]: {
                        [FIELDS]: [
                          {
                            [NAME]: name2,
                            [VALIDATOR]: func,
                            [VALUE]: invalidValue,
                          },
                        ],
                      },
                    },
                  ],
                };

                const expectedValue = {
                  [CONSTRAINTS]: {
                    [FIELDS]: {
                      [FIELDS]: {
                        [CHILDREN]: [
                          {
                            [FIELDS]: {
                              [CHILDREN]: {
                                [FIELDS]: {
                                  [FIELDS]: {
                                    [CHILDREN]: [
                                      {
                                        [FIELDS]: {
                                          [VALUE]: [`Wasn't 'Object'`],
                                        },
                                      },
                                    ],
                                  },
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                };

                const validation = validateConstraintsConfigured(value);

                expect(validation).toEqualFailureWithValue(expectedValue);
              }, typeData.withoutObjectValues);
            });
          });
        });
      });

      describe(`with additional keys`, () => {
        describe(`for children`, () => {
          it.only(`returns a Validation.Failure with message`, () => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: name1,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: name2,
                        [VALIDATOR]: func,
                        [CHILDREN]: {
                          [invalidKeyName]: invalidKeyValue,
                        },
                      },
                    ],
                  },
                },
              ],
            };

            const expectedValue = {
              [CONSTRAINTS]: {
                [FIELDS]: {
                  [FIELDS]: {
                    [CHILDREN]: [
                      {
                        [FIELDS]: {
                          [CHILDREN]: {
                            [FIELDS]: {
                              [FIELDS]: {
                                [CHILDREN]: [
                                  {
                                    [FIELDS]: {
                                      [CHILDREN]: {
                                        [FIELDS_FAILURE_MESSAGE]: [
                                          `Object included invalid key(s): '[${invalidKeyName}]'`,
                                        ],
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            };
            const validation = validateConstraintsConfigured(value);
            expect(validation).toEqualFailureWithValue(expectedValue);
          });
        });

        describe(`for value`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: name1,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: name2,
                        [VALIDATOR]: func,
                        [VALUE]: {
                          [invalidKeyName]: invalidKeyValue,
                        },
                      },
                    ],
                  },
                },
              ],
            };

            const expectedValue = {
              [CONSTRAINTS]: {
                [FIELDS]: {
                  [FIELDS]: {
                    [CHILDREN]: [
                      {
                        [FIELDS]: {
                          [CHILDREN]: {
                            [FIELDS]: {
                              [FIELDS]: {
                                [CHILDREN]: [
                                  {
                                    [FIELDS]: {
                                      [VALUE]: {
                                        [FIELDS_FAILURE_MESSAGE]: [
                                          `Object included invalid key(s): '[${invalidKeyName}]'`,
                                        ],
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            };

            const validation = validateConstraintsConfigured(value);
            expect(validation).toEqualFailureWithValue(expectedValue);
          });
        });
      });
    });

    describe(`with two exclusive keys`, () => {
      describe(`'defaultValue' and 'isRequired'`, () => {
        it.only(`returns a Validation.Failure with message`, () => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: name2,
                      [VALIDATOR]: func,
                      [VALUE]: {
                        [FIELDS]: [
                          {
                            [NAME]: value1,
                            [VALIDATOR]: func,
                            [DEFAULT_VALUE]: true, // Exclusive
                            [IS_REQUIRED]: true, // Exclusive
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          };

          const expectedValue = {
            [CONSTRAINTS]: {
              [FIELDS]: {
                [FIELDS]: {
                  [CHILDREN]: [
                    {
                      [FIELDS]: {
                        [CHILDREN]: {
                          [FIELDS]: {
                            [FIELDS]: {
                              [CHILDREN]: [
                                {
                                  [FIELDS]: {
                                    [VALUE]: {
                                      [FIELDS]: {
                                        [FIELDS]: {
                                          [CHILDREN]: [
                                            {
                                              [FIELDS_FAILURE_MESSAGE]: [
                                                `Object had more than one exlusive key: ['${IS_REQUIRED}', '${DEFAULT_VALUE}']`,
                                              ],
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          };

          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualFailureWithValue(expectedValue);
        });
      });

      describe(`['value' and 'children']`, () => {
        it.only(`returns a Validation.Failure with message`, () => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: name2,
                      [VALIDATOR]: func,
                      [VALUE]: {
                        [FIELDS]: [
                          {
                            [NAME]: value1,
                            [VALIDATOR]: func,
                            [CHILDREN]: {}, // Exclusive
                            [VALUE]: {}, // Exclusive
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          };

          const expectedValue = {
            [CONSTRAINTS]: {
              [FIELDS]: {
                [FIELDS]: {
                  [CHILDREN]: [
                    {
                      [FIELDS]: {
                        [CHILDREN]: {
                          [FIELDS]: {
                            [FIELDS]: {
                              [CHILDREN]: [
                                {
                                  [FIELDS]: {
                                    [VALUE]: {
                                      [FIELDS]: {
                                        [FIELDS]: {
                                          [CHILDREN]: [
                                            {
                                              [FIELDS_FAILURE_MESSAGE]: [
                                                `Object had more than one exlusive key: ['${VALUE}', '${CHILDREN}']`,
                                              ],
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          };

          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualFailureWithValue(expectedValue);
        });
      });
    });

    describe(`with missing requried keys`, () => {
      map(fieldName => {
        describe(fieldName, () => {
          it.only(`returns a Validation.Failure with message`, () => {
            const fields = requiredKeysWithout(fieldName);

            const value = {
              [FIELDS]: [
                {
                  ...validRequiredFields,
                  [CHILDREN]: {
                    [FIELDS]: fields,
                  },
                },
              ],
            };

            const expectedValue = {
              [CONSTRAINTS]: {
                [FIELDS]: {
                  [FIELDS]: {
                    [CHILDREN]: [
                      {
                        [FIELDS]: {
                          [CHILDREN]: {
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
                          },
                        },
                      },
                    ],
                  },
                },
              },
            };

            const validation = validateConstraintsConfigured(value);

            expect(validation).toEqualFailureWithValue(expectedValue);
          });
        });
      })(requiredKeys);
    });

    describe(`with invalid field values`, () => {
      describe(`with non-array value for 'fields'`, () => {
        it(`returns a Validation.Failure with message`, () => {
          map(fieldValue => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: name1,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: name2,
                        [VALIDATOR]: func,
                        [VALUE]: {
                          [FIELDS]: fieldValue,
                        },
                      },
                    ],
                  },
                },
              ],
            };
            const validation = validateConstraintsConfigured(value);
            expect(validation).toEqualFailureWithValue([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': for field 'value': Object included invalid values(s): Key 'fields': Wasn't 'Array'`,
            ]);
          }, typeData.withoutArrayValues);
        });
      });
    });

    describe(`with 'fields' array containing non-object values`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: name2,
                      [VALIDATOR]: func,
                      [VALUE]: {
                        [FIELDS]: [fieldValue],
                      },
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualFailureWithValue([
            `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': for field 'value': Object included invalid values(s): Key 'fields': Array contained invalid element(s): '${fieldValue}': Wasn't 'Object'`,
          ]);
        })(typeData.withoutObjectValues);
      });
    });

    describe(`with non-function value for 'fieldsValidator'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: name2,
                      [VALIDATOR]: func,
                      [VALUE]: {
                        [FIELDS_VALIDATOR]: fieldValue,
                        [FIELDS]: [],
                      },
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualFailureWithValue([
            `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': for field 'value': Object included invalid values(s): Key 'fieldsValidator': Wasn't 'Function'`,
          ]);
        }, typeData.withoutFunctionValues);
      });
    });

    describe(`for fields array values`, () => {
      describe(`with non-string value for 'name'`, () => {
        it(`returns a Validation.Failure with message`, () => {
          map(fieldValue => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: name1,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: fieldValue,
                        [VALIDATOR]: func,
                      },
                    ],
                  },
                },
              ],
            };
            const validation = validateConstraintsConfigured(value);
            expect(validation).toEqualFailureWithValue([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'name': Wasn't 'String'`,
            ]);
          }, typeData.withoutStringValues);
        });
      });
    });

    describe(`with non-function value for 'validator'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: name2,
                      [VALIDATOR]: fieldValue,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualFailureWithValue([
            `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'validator': Wasn't 'Function'`,
          ]);
        }, typeData.withoutFunctionValues);
      });
    });

    describe(`with non-function value for 'transformer'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: name2,
                      [VALIDATOR]: func,
                      [TRANSFORMER]: fieldValue,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualFailureWithValue([
            `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'transformer': Wasn't 'Function'`,
          ]);
        }, typeData.withoutFunctionValues);
      });
    });

    describe(`with non-boolean value for 'isRequired'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: name2,
                      [VALIDATOR]: func,
                      [IS_REQUIRED]: fieldValue,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualFailureWithValue([
            `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'isRequired': Wasn't 'Boolean'`,
          ]);
        }, typeData.withoutBooleanValues);
      });
    });

    describe(`with undefined value for 'defaultValue'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value = {
          [FIELDS]: [
            {
              [NAME]: name1,
              [VALIDATOR]: func,
              [CHILDREN]: {
                [FIELDS]: [
                  {
                    [NAME]: name2,
                    [VALIDATOR]: func,
                    [DEFAULT_VALUE]: undefined,
                  },
                ],
              },
            },
          ],
        };
        const validation = validateConstraintsConfigured(value);
        expect(validation).toEqualFailureWithValue([
          `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'defaultValue': Was 'Undefined'`,
        ]);
      });
    });

    describe(`with non-object value for 'children'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: name2,
                      [VALIDATOR]: func,
                      [CHILDREN]: fieldValue,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualFailureWithValue([
            `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'children': Wasn't 'Object'`,
          ]);
        }, typeData.withoutObjectValues);
      });
    });

    describe(`with non-object value for 'value'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                ...validRequiredFields,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: name2,
                      [VALIDATOR]: func,
                      [VALUE]: fieldValue,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraintsConfigured(value);
          expect(validation).toEqualFailureWithValue([
            `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'value': Wasn't 'Object'`,
          ]);
        }, typeData.withoutObjectValues);
      });
    });
  });
});
