import { validation as Validation } from 'folktale';
import { map } from 'ramda';
import validateConstraints from '../../constraintValidators/validateConstraints';
import {
  notObjectValues,
  notBooleanValues,
  notFunctionValues,
  notStringValues,
  notArrayValues,
} from '../testHelpers/fixtures';

const { Success, Failure } = Validation;

describe(`validateConstraints`, () => {
  describe(`with valid constraints`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const value = {
        fields: [
          {
            name: `a`,
            validator() {},
            isRequired: true,
            transformer() {},
            children: {
              fields: [
                {
                  name: `c`,
                  validator() {},
                  children: {}, // Allow empty object as value of childrn
                },
                {
                  name: `d`,
                  validator() {},
                  children: {
                    fields: [], // Allow empty array as value of fields
                  },
                },
                {
                  name: `e`,
                  validator() {},
                  value: {}, // Allow empty object as value of value
                },
                {
                  name: `f`,
                  validator() {},
                  defaultValue: true,
                  transformer() {},
                  children: {
                    fields: [
                      {
                        name: `g`,
                        validator() {},
                      },
                      {
                        name: `h`,
                        validator() {},
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: `b`,
            validator() {},
            defaultValue: true,
            transformer() {},
          },
        ],
      };
      const validation = validateConstraints(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`with a flat object`, () => {
    describe(`with invalid constraints`, () => {
      describe(`with empty constraint object`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {};
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([`Constraints Object Invalid: Was Empty`])
          );
        });
      });

      describe(`with invalid value for constraints`, () => {
        it(`returns a Validation.Failure with message`, () => {
          map(value => {
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([`Constraints Object Invalid: Wasn't type: 'Object'`])
            );
          }, notObjectValues);
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

      describe(`with two exclusive keys ['defaultValue' and 'isRequired']`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            fields: [
              {
                name: `a`,
                validator() {},
                defaultValue: true, // Exclusive
                isRequired: true, // Exclusive
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

      describe(`with two exclusive keys ['value' and 'children']`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            fields: [
              {
                name: `a`,
                validator() {},
                value: {}, // Exclusive
                children: [], // Exclusive
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

      describe(`with non-array value for 'fields'`, () => {
        it(`returns a Validation.Failure with message`, () => {
          map(fieldValue => {
            const value = {
              fields: fieldValue,
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: Object included invalid values(s): Key 'fields': Wasn't type: 'Array'`,
              ])
            );
          }, notArrayValues);
        });
      });

      describe(`with 'fields' array containing non-object values`, () => {
        it(`returns a Validation.Failure with message`, () => {
          map(fieldValue => {
            const value = {
              fields: [fieldValue],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: Object included invalid values(s): Key 'fields': Array contained invalid element(s): '${fieldValue}': Wasn't type: 'Object'`,
              ])
            );
          })(notObjectValues);
        });
      });

      describe(`with non-function value for 'fieldsValidator'`, () => {
        it(`returns a Validation.Failure with message`, () => {
          map(fieldValue => {
            const value = {
              fieldsValidator: fieldValue,
              fields: [],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: Object included invalid values(s): Key 'fieldsValidator': Wasn't type: 'Function'`,
              ])
            );
          }, notFunctionValues);
        });
      });

      describe(`for fields array values`, () => {
        describe(`with non-string value for 'name'`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                fieldsValidator() {},
                fields: [
                  {
                    name: fieldValue,
                    validator() {},
                  },
                ],
              };
              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'name': Wasn't type: 'String'`,
                ])
              );
            }, notStringValues);
          });
        });

        describe(`with non-function value for 'validator'`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                fieldsValidator() {},
                fields: [
                  {
                    name: `x`,
                    validator: fieldValue,
                  },
                ],
              };
              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'validator': Wasn't type: 'Function'`,
                ])
              );
            }, notFunctionValues);
          });
        });

        describe(`with non-function value for 'transformer'`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                fieldsValidator() {},
                fields: [
                  {
                    name: `x`,
                    validator() {},
                    transformer: fieldValue,
                  },
                ],
              };
              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'transformer': Wasn't type: 'Function'`,
                ])
              );
            }, notFunctionValues);
          });
        });

        describe(`with non-boolean value for 'isRequired'`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                fieldsValidator() {},
                fields: [
                  {
                    name: `x`,
                    validator() {},
                    isRequired: fieldValue,
                  },
                ],
              };
              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'isRequired': Wasn't type: 'Boolean'`,
                ])
              );
            }, notBooleanValues);
          });
        });

        describe(`with undefined value for 'defaultValue'`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const value = {
              fieldsValidator() {},
              fields: [
                {
                  name: `x`,
                  validator() {},
                  defaultValue: undefined,
                },
              ],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'defaultValue': Was type: 'Undefined'`,
              ])
            );
          });
        });

        describe(`with non-object value for 'children'`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                fieldsValidator() {},
                fields: [
                  {
                    name: `x`,
                    validator() {},
                    children: fieldValue,
                  },
                ],
              };
              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'children': Wasn't type: 'Object'`,
                ])
              );
            }, notObjectValues);
          });
        });

        describe(`with non-object value for 'value'`, () => {
          it(`returns a Validation.Failure with message`, () => {
            map(fieldValue => {
              const value = {
                fieldsValidator() {},
                fields: [
                  {
                    name: `x`,
                    validator() {},
                    value: fieldValue,
                  },
                ],
              };
              const validation = validateConstraints(value);
              expect(validation).toEqual(
                Failure([
                  `Constraints Object Invalid: for field 'fields': Object included invalid values(s): Key 'value': Wasn't type: 'Object'`,
                ])
              );
            }, notObjectValues);
          });
        });
      });
    });
  });

  describe(`with a nested object`, () => {
    describe(`with invalid constraints`, () => {
      describe(`with invalid field keys`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            fields: [
              {
                name: `a`,
                validator() {},
                invalid: `x`,
              },
            ],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: for field 'fields': Object included invalid key(s): '[invalid]'`,
            ])
          );
        });
      });

      describe(`with missing required fields`, () => {
        describe(`name`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const value = {
              fields: [
                {
                  validator() {},
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
              fields: [
                {
                  name: `x`,
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
    });
  });
});
