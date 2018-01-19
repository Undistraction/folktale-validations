import { validation as Validation } from 'folktale';
import { map, descend } from 'ramda';
import validateConstraints from '../../constraintValidators/validateConstraints';

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
            Failure([`Constraints Object Invalid: Object Invalid: Was Empty`])
          );
        });
      });

      describe(`with invalid value for constraints`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const values = [`x`, 5, true, false, null, undefined, NaN, [], /x/];
          map(value => {
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: Object Invalid: Wasn't type: 'Object'`,
              ])
            );
          }, values);
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
              `Constraints Object Invalid: Object had more than one exlusive key: ['isRequired', 'defaultValue']`,
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
              `Constraints Object Invalid: Object had more than one exlusive key: ['value', 'children']`,
            ])
          );
        });
      });

      describe(`with non-array value for 'fields'`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            fields: {},
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: Object included invalid values(s): Key 'fields': Wasn't type: 'Array'`,
            ])
          );
        });
      });

      describe(`with 'fields' array containing non-object values`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            fields: [`x`, false],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: Object included invalid values(s): Key 'fields': Array contained invalid element(s): 'x': Wasn't type: 'Object','false': Wasn't type: 'Object'`,
            ])
          );
        });
      });

      describe(`with non-function value for 'fieldsValidator'`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value = {
            fieldsValidator: {},
            fields: [],
          };
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: Object included invalid values(s): Key 'fieldsValidator': Wasn't type: 'Function'`,
            ])
          );
        });
      });

      describe(`for fields array values`, () => {
        describe(`with non-string value for 'name'`, () => {
          it(`returns a Validation.Failure with message`, () => {
            const value = {
              fieldsValidator() {},
              fields: [
                {
                  name: {},
                  validator() {},
                },
              ],
            };
            const validation = validateConstraints(value);
            expect(validation).toEqual(
              Failure([
                `Constraints Object Invalid: Object included invalid values(s): Key 'name': Wasn't type: 'String'`,
              ])
            );
          });
        });
      });
    });
  });

  describe(`with a nested object`, () => {
    describe(`with invalid constraints`, () => {
      describe(`with invalid field keys`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const invalidKey = `invalid`;
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
              `Constraints Object Invalid: Object included invalid key(s): '[${invalidKey}]'`,
            ])
          );
        });
      });
    });
  });
});
