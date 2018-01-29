import { validation as Validation } from 'folktale';
import { map } from 'ramda';
import validateConstraints from '../../constraintValidators/validateConstraints';
import { func } from '../testHelpers/fixtures';
import typeData from '../testHelpers/fixtures/typeData';
import { FIELD_NAMES } from '../../const';

const { Success, Failure } = Validation;

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
} = FIELD_NAMES;

describe(`validateConstraints`, () => {
  // ---------------------------------------------------------------------------
  // Full nested constraint object with all features
  // ---------------------------------------------------------------------------

  describe(`with valid constraints`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const value = {
        [FIELDS]: [
          {
            [NAME]: `a`,
            [VALIDATOR]: func,
            [IS_REQUIRED]: true,
            [TRANSFORMER]: func,
            [CHILDREN]: {
              [FIELDS]: [
                {
                  [NAME]: `c`,
                  [VALIDATOR]: func,
                  [CHILDREN]: {}, // Allow empty object as value of childrn
                },
                {
                  [NAME]: `d`,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [], // Allow empty array as value of fields
                  },
                },
                {
                  [NAME]: `e`,
                  [VALIDATOR]: func,
                  [VALUE]: {}, // Allow empty object as value of value
                },
                {
                  [NAME]: `f`,
                  [VALIDATOR]: func,
                  [DEFAULT_VALUE]: true,
                  [TRANSFORMER]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: `g`,
                        [VALIDATOR]: func,
                      },
                      {
                        [NAME]: `h`,
                        [VALIDATOR]: func,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            [NAME]: `b`,
            [VALIDATOR]: func,
            [DEFAULT_VALUE]: true,
            [TRANSFORMER]: func,
          },
        ],
      };
      const validation = validateConstraints(value);
      expect(validation).toEqual(Success(value));
    });

    describe(`empty values`, () => {
      describe(`with empty children object`, () => {
        it(`returns a Validation.Success`, () => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {},
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(Success(value));
        });
      });

      describe(`with empty value object`, () => {
        it(`returns a Validation.Success`, () => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [VALUE]: {},
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(Success(value));
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // One level of constraints
  // ---------------------------------------------------------------------------

  describe(`with one level of constraints`, () => {
    describe(`with empty constraint object`, () => {
      it(`returns a Validation.Success with supplied value`, () => {
        const value = {};
        const validation = validateConstraints(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`with invalid constraints`, () => {
      describe(`with invalid value`, () => {
        it(`returns a Validation.Failure with message`, () => {
          map(value => {
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([`Constraints Object Invalid: Wasn't 'Object'`])
            );
          }, typeData.withoutObjectValues);
        });
      });

      describe(`with additional keys`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const key = `x`;
          const value = {
            [key]: 1,
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: Object included invalid key(s): '[${key}]'`,
            ])
          );
        });
      });

      describe(`with two exclusive keys`, () => {
        describe(`['defaultValue' and 'isRequired']`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: `a`,
                  [VALIDATOR]: func,
                  [DEFAULT_VALUE]: true, // Exclusive
                  [IS_REQUIRED]: true, // Exclusive
                },
              ],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: for field 'fields': Object had more than one exlusive key: ['isRequired', 'defaultValue']`,
              ])
            );
          });
        });

        describe(`['value' and 'children']`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: `a`,
                  [VALIDATOR]: func,
                  [VALUE]: {}, // Exclusive
                  [CHILDREN]: [], // Exclusive
                },
              ],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: for field 'fields': Object had more than one exlusive key: ['value', 'children']`,
              ])
            );
          });
        });
      });

      describe(`with missing requried keys`, () => {
        describe(`name`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const value = {
              [FIELDS]: [
                {
                  [VALIDATOR]: func,
                },
              ],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: for field 'fields': Object was missing required key(s): ['name']`,
              ])
            );
          });
        });

        describe(`validator`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: `x`,
                },
              ],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: for field 'fields': Object was missing required key(s): ['validator']`,
              ])
            );
          });
        });
      });

      describe(`with invalid field values`, () => {
        describe(`with non-array value for 'fields'`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                [FIELDS]: fieldValue,
              };
              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: Object included invalid values(s): Key 'fields': Wasn't 'Array'`,
                ])
              );
            }, typeData.withoutArrayValues);
          });
        });

        describe(`with 'fields' array containing non-object values`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                [FIELDS]: [fieldValue],
              };
              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: Object included invalid values(s): Key 'fields': Array contained invalid element(s): '${fieldValue}': Wasn't 'Object'`,
                ])
              );
            })(typeData.withoutObjectValues);
          });
        });

        describe(`with non-function value for 'fieldsValidator'`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                [FIELDS_VALIDATOR]: fieldValue,
                [FIELDS]: [],
              };
              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: Object included invalid values(s): Key 'fieldsValidator': Wasn't 'Function'`,
                ])
              );
            }, typeData.withoutFunctionValues);
          });
        });

        describe(`for fields array values`, () => {
          describe(`with non-string value for 'name'`, () => {
            it(`returns a Validation.Failure with message`, () => {
              map(fieldValue => {
                const value = {
                  [FIELDS_VALIDATOR]: func,
                  [FIELDS]: [
                    {
                      [NAME]: fieldValue,
                      [VALIDATOR]: func,
                    },
                  ],
                };
                const validation = validateConstraints(value);
                expect(validation).toEqual(
                  Failure([
                    `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'name': Wasn't 'String'`,
                  ])
                );
              }, typeData.withoutStringValues);
            });
          });

          describe(`with non-function value for 'validator'`, () => {
            it(`returns a Validation.Failure with message`, () => {
              map(fieldValue => {
                const value = {
                  [FIELDS_VALIDATOR]: func,
                  [FIELDS]: [
                    {
                      [NAME]: `x`,
                      validator: fieldValue,
                    },
                  ],
                };
                const validation = validateConstraints(value);
                expect(validation).toEqual(
                  Failure([
                    `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'validator': Wasn't 'Function'`,
                  ])
                );
              }, typeData.withoutFunctionValues);
            });
          });

          describe(`with non-function value for 'transformer'`, () => {
            it(`returns a Validation.Failure with message`, () => {
              map(fieldValue => {
                const value = {
                  [FIELDS_VALIDATOR]: func,
                  [FIELDS]: [
                    {
                      [NAME]: `x`,
                      [VALIDATOR]: func,
                      transformer: fieldValue,
                    },
                  ],
                };
                const validation = validateConstraints(value);
                expect(validation).toEqual(
                  Failure([
                    `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'transformer': Wasn't 'Function'`,
                  ])
                );
              }, typeData.withoutFunctionValues);
            });
          });

          describe(`with non-boolean value for 'isRequired'`, () => {
            it(`returns a Validation.Failure with message`, () => {
              map(fieldValue => {
                const value = {
                  [FIELDS_VALIDATOR]: func,
                  [FIELDS]: [
                    {
                      [NAME]: `x`,
                      [VALIDATOR]: func,
                      [IS_REQUIRED]: fieldValue,
                    },
                  ],
                };
                const validation = validateConstraints(value);
                expect(validation).toEqual(
                  Failure([
                    `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'isRequired': Wasn't 'Boolean'`,
                  ])
                );
              }, typeData.withoutBooleanValues);
            });
          });

          describe(`with undefined value for 'defaultValue'`, () => {
            it(`returns a Validation.Failure with message`, () => {
              const value = {
                [FIELDS_VALIDATOR]: func,
                [FIELDS]: [
                  {
                    [NAME]: `x`,
                    [VALIDATOR]: func,
                    [DEFAULT_VALUE]: undefined,
                  },
                ],
              };
              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'defaultValue': Was 'Undefined'`,
                ])
              );
            });
          });

          describe(`with non-object value for 'children'`, () => {
            it(`returns a Validation.Failure with message`, () => {
              map(fieldValue => {
                const value = {
                  [FIELDS_VALIDATOR]: func,
                  [FIELDS]: [
                    {
                      [NAME]: `x`,
                      [VALIDATOR]: func,
                      [CHILDREN]: fieldValue,
                    },
                  ],
                };
                const validation = validateConstraints(value);
                expect(validation).toEqual(
                  Failure([
                    `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'children': Wasn't 'Object'`,
                  ])
                );
              }, typeData.withoutObjectValues);
            });
          });

          describe(`with non-object value for 'value'`, () => {
            it(`returns a Validation.Failure with message`, () => {
              map(fieldValue => {
                const value = {
                  [FIELDS_VALIDATOR]: func,
                  [FIELDS]: [
                    {
                      [NAME]: `x`,
                      [VALIDATOR]: func,
                      [VALUE]: fieldValue,
                    },
                  ],
                };
                const validation = validateConstraints(value);
                expect(validation).toEqual(
                  Failure([
                    `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'value': Wasn't 'Object'`,
                  ])
                );
              }, typeData.withoutObjectValues);
            });
          });
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
        describe(`with empty children object`, () => {
          it(`returns a Validation.Success`, () => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: `x`,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: `y`,
                        [VALIDATOR]: func,
                        [CHILDREN]: {},
                      },
                    ],
                  },
                },
              ],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(Success(value));
          });
        });

        describe(`with empty value object`, () => {
          it(`returns a Validation.Success`, () => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: `x`,
                  [VALIDATOR]: func,
                  [VALUE]: {
                    [FIELDS]: [
                      {
                        [NAME]: `y`,
                        [VALIDATOR]: func,
                        [VALUE]: {},
                      },
                    ],
                  },
                },
              ],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(Success(value));
          });
        });
      });
    });

    describe(`with invalid constraints`, () => {
      describe(`with invalid value`, () => {
        describe(`for children`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(invalidValue => {
              const value = {
                [FIELDS]: [
                  {
                    [NAME]: `x`,
                    [VALIDATOR]: func,
                    [CHILDREN]: {
                      [FIELDS]: [
                        {
                          [NAME]: `y`,
                          [VALIDATOR]: func,
                          [CHILDREN]: invalidValue,
                        },
                      ],
                    },
                  },
                ],
              };

              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'children': Wasn't 'Object'`,
                ])
              );
            }, typeData.withoutObjectValues);
          });

          describe(`for value`, () => {
            it(`returns a Validation.Failure with message`, () => {
              map(invalidValue => {
                const value = {
                  [FIELDS]: [
                    {
                      [NAME]: `x`,
                      [VALIDATOR]: func,
                      [CHILDREN]: {
                        [FIELDS]: [
                          {
                            [NAME]: `y`,
                            [VALIDATOR]: func,
                            [VALUE]: invalidValue,
                          },
                        ],
                      },
                    },
                  ],
                };

                const validation = validateConstraints(value);
                expect(validation).toEqual(
                  Failure([
                    `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'value': Wasn't 'Object'`,
                  ])
                );
              }, typeData.withoutObjectValues);
            });
          });
        });
      });
      describe(`with additional keys`, () => {
        describe(`for children`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const invalidKey = `invalid`;
            const value = {
              [FIELDS]: [
                {
                  [NAME]: `x`,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: `y`,
                        [VALIDATOR]: func,
                        [CHILDREN]: {
                          [invalidKey]: `x`,
                        },
                      },
                    ],
                  },
                },
              ],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': for field 'children': Object included invalid key(s): '[${invalidKey}]'`,
              ])
            );
          });
        });

        describe(`for value`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const invalidKey = `invalid`;
            const value = {
              [FIELDS]: [
                {
                  [NAME]: `x`,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: `y`,
                        [VALIDATOR]: func,
                        [VALUE]: {
                          [invalidKey]: `x`,
                        },
                      },
                    ],
                  },
                },
              ],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': for field 'value': Object included invalid key(s): '[${invalidKey}]'`,
              ])
            );
          });
        });
      });
    });

    describe(`with two exclusive keys`, () => {
      describe(`['defaultValue' and 'isRequired']`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: `y`,
                      [VALIDATOR]: func,
                      [VALUE]: {
                        [FIELDS]: [
                          {
                            [NAME]: `a`,
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
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': for field 'value': for field 'fields': Object had more than one exlusive key: ['isRequired', 'defaultValue']`,
            ])
          );
        });
      });

      describe(`['value' and 'children']`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: `y`,
                      [VALIDATOR]: func,
                      [VALUE]: {
                        [FIELDS]: [
                          {
                            [NAME]: `a`,
                            [VALIDATOR]: func,
                            [CHILDREN]: true, // Exclusive
                            [VALUE]: true, // Exclusive
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': for field 'value': for field 'fields': Object had more than one exlusive key: ['value', 'children']`,
            ])
          );
        });
      });
    });

    describe(`with missing requried keys`, () => {
      describe(`name`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [VALIDATOR]: func,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object was missing required key(s): ['name']`,
            ])
          );
        });
      });

      describe(`validator`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: `x`,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object was missing required key(s): ['validator']`,
            ])
          );
        });
      });

      describe(`validator`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': Object was missing required key(s): ['validator']`,
            ])
          );
        });
      });
    });

    describe(`with invalid field values`, () => {
      describe(`with non-array value for 'fields'`, () => {
        it(`returns a Validation.Failure with message`, () => {
          map(fieldValue => {
            const value = {
              [FIELDS]: [
                {
                  [NAME]: `x`,
                  [VALIDATOR]: func,
                  [CHILDREN]: {
                    [FIELDS]: [
                      {
                        [NAME]: `y`,
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
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': for field 'value': Object included invalid values(s): Key 'fields': Wasn't 'Array'`,
              ])
            );
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
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: `y`,
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
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': for field 'value': Object included invalid values(s): Key 'fields': Array contained invalid element(s): '${fieldValue}': Wasn't 'Object'`,
            ])
          );
        })(typeData.withoutObjectValues);
      });
    });

    describe(`with non-function value for 'fieldsValidator'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: `y`,
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
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': for field 'value': Object included invalid values(s): Key 'fieldsValidator': Wasn't 'Function'`,
            ])
          );
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
                  [NAME]: `x`,
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
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'name': Wasn't 'String'`,
              ])
            );
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
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: `y`,
                      [VALIDATOR]: fieldValue,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'validator': Wasn't 'Function'`,
            ])
          );
        }, typeData.withoutFunctionValues);
      });
    });

    describe(`with non-function value for 'transformer'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: `y`,
                      [VALIDATOR]: func,
                      [TRANSFORMER]: fieldValue,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'transformer': Wasn't 'Function'`,
            ])
          );
        }, typeData.withoutFunctionValues);
      });
    });

    describe(`with non-boolean value for 'isRequired'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: `y`,
                      [VALIDATOR]: func,
                      [IS_REQUIRED]: fieldValue,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'isRequired': Wasn't 'Boolean'`,
            ])
          );
        }, typeData.withoutBooleanValues);
      });
    });

    describe(`with undefined value for 'defaultValue'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value = {
          [FIELDS]: [
            {
              [NAME]: `x`,
              [VALIDATOR]: func,
              [CHILDREN]: {
                [FIELDS]: [
                  {
                    [NAME]: `y`,
                    [VALIDATOR]: func,
                    [DEFAULT_VALUE]: undefined,
                  },
                ],
              },
            },
          ],
        };
        const validation = validateConstraints(value);
        expect(validation).toEqual(
          Failure([
            `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'defaultValue': Was 'Undefined'`,
          ])
        );
      });
    });

    describe(`with non-object value for 'children'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: `y`,
                      [VALIDATOR]: func,
                      [CHILDREN]: fieldValue,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'children': Wasn't 'Object'`,
            ])
          );
        }, typeData.withoutObjectValues);
      });
    });

    describe(`with non-object value for 'value'`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(fieldValue => {
          const value = {
            [FIELDS]: [
              {
                [NAME]: `x`,
                [VALIDATOR]: func,
                [CHILDREN]: {
                  [FIELDS]: [
                    {
                      [NAME]: `y`,
                      [VALIDATOR]: func,
                      [VALUE]: fieldValue,
                    },
                  ],
                },
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': for field 'children': for field 'fields': Object included invalid values(s): Key 'value': Wasn't 'Object'`,
            ])
          );
        }, typeData.withoutObjectValues);
      });
    });
  });
});
