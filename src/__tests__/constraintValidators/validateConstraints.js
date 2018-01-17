import { validation as Validation } from 'folktale';
import { map } from 'ramda';
import validateConstraints from '../../constraintValidators/validateConstraints';
import CONSTRAINTS from '../../constraints';

const { Success, Failure } = Validation;

describe(`validateConstraints`, () => {
  describe(`with invalid constraints`, () => {
    describe(`with invalid value for constraints`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const values = [`x`, 5, true, false, null, undefined, NaN, [], /x/];
        map(value => {
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([`Constraints Object Invalid: Wasn't type: 'Object'`])
          );
        }, values);
      });
    });

    describe(`with empty constraint object`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value = {};
        const validation = validateConstraints(value);
        expect(validation).toEqual(
          Failure([`Constraints Object Invalid: Was Empty`])
        );
      });
    });

    describe(`with fields array containing non-object values`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value = {
          fields: [`x`, false],
        };
        const validation = validateConstraints(value);
        expect(validation).toEqual(
          Failure([
            `Constraints Object Invalid: Array contained invalid element(s): 'x': Wasn't type: 'Object','false': Wasn't type: 'Object'`,
          ])
        );
      });
    });

    describe(`with additional keys`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value = {
          fields: [
            {
              name: `x`,
              validator() {},
              a: 1,
            },
          ],
        };
        const validation = validateConstraints(value);
        expect(validation).toEqual(
          Failure([
            `Constraints Object Invalid: Array contained invalid element(s): '[object Object]': Object included invalid key(s): '[a]'`,
          ])
        );
      });
    });

    describe(`with missing required keys`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value1 = {
          fields: [
            {
              validator() {},
            },
          ],
        };

        const value2 = {
          fields: [
            {
              name: `x`,
            },
          ],
        };

        const values = [[`name`, value1], [`validator`, value2]];
        map(([name, value]) => {
          const validation = validateConstraints(value);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: Array contained invalid element(s): '[object Object]': Object was missing required key(s): ['${name}']`,
            ])
          );
        }, values);
      });
    });
  });

  describe(`with valid constraints`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const value = {
        fields: [
          {
            name: `a`,
            validator() {},
            isRequired: true,
            transformer() {},
          },
          {
            name: `b`,
            validator() {},
            isRequired: true,
            transformer() {},
          },
        ],
      };
      const validation = validateConstraints(value);
      expect(validation).toEqual(Success(value));
    });
  });

  // describe(`with valid nested constraint obj`, () => {
  //   it(`returns a Validation.Success with supplied value`, () => {
  //     const value = [
  //       {
  //         name: `a`,
  //         isRequired: true,
  //         value: [
  //           {
  //             name: `c`,
  //             validator() {},
  //             isRequired: true,
  //             transformer() {},
  //             defaultValue: true,
  //           },
  //         ],
  //       },
  //       {
  //         name: `b`,
  //         validator() {},
  //         isRequired: true,
  //         transformer() {},
  //         defaultValue: true,
  //       },
  //     ];
  //     const validation = validateConstraints(value);
  //     expect(validation).toEqual(Success(value));
  //   });

  describe(`with own constraint obj`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const validation = validateConstraints(CONSTRAINTS);
      expect(validation).toEqual(Success(CONSTRAINTS));
    });
  });
});
