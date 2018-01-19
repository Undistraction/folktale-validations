import { validation as Validation } from 'folktale';
import { validateObjectWithConstraints } from '../../index';
import {
  stubReturnsSuccess,
  stubReturnsFailure,
  spy,
  stubReturns,
} from '../testHelpers/sinon';

const { Success, Failure } = Validation;

const value1 = 1;
const value2 = 2;
const value3 = 3;
const value4 = 4;
const value5 = 5;
const message1 = `message1`;

describe(`validateObjectWithConstraints`, () => {
  describe(`with a flat constraint object`, () => {
    describe(`that satisfies constraints`, () => {
      it(`returns a Validation.Success with supplied value`, () => {
        const v1 = stubReturnsSuccess(value1);
        const v2 = spy();
        const v3 = stubReturnsSuccess(value3);
        const v4 = spy();
        const v5 = stubReturnsSuccess(value5);
        const t1 = stubReturns(value5 + 1);
        const o = {
          a: value1,
          c: value3,
          e: value5,
        };

        const constraints = {
          fields: [
            {
              name: `a`,
              validator: v1,
              isRequired: true,
            },
            {
              name: `b`,
              validator: v2,
            },
            {
              name: `c`,
              validator: v3,
              defaultValue: 20,
            },
            {
              name: `d`,
              validator: v4,
              defaultValue: value4,
            },
            {
              name: `e`,
              validator: v5,
              transformer: t1,
            },
          ],
        };

        const validator = validateObjectWithConstraints(constraints);
        const validation = validator(o);
        expect(validation).toEqual(Success({ a: 1, c: 3, d: 4, e: 6 }));
        expect(v1.calledWith(value1)).toBeTruthy();
        expect(v3.calledWith(value3)).toBeTruthy();
        expect(v2.notCalled).toBeTruthy();
        expect(v4.notCalled).toBeTruthy();
        expect(v5.calledWith(value5)).toBeTruthy();
      });
    });

    describe(`that doesn't satisfy constraints`, () => {
      describe(`with missing required key on item`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const v1 = stubReturnsSuccess(value1);
          const v2 = stubReturnsFailure(message1);
          const o = {
            a: value1,
          };

          const constraints = {
            fields: [
              {
                name: `a`,
                validator: v1,
                isRequired: true,
              },
              {
                name: `b`,
                validator: v2,
                isRequired: true,
              },
            ],
          };

          const validator = validateObjectWithConstraints(constraints);
          const validation = validator(o);
          expect(validation).toEqual(
            Failure([`Object was missing required key(s): ['b']`])
          );
        });
      });
    });

    describe(`with both isRequired and defaultValue keys present on an item`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const v1 = spy();
        const o = {
          a: 1,
        };

        const constraints = Object.freeze({
          fields: [
            {
              name: `a`,
              validator: v1,
              isRequired: true,
              defaultValue: true,
            },
          ],
        });

        const validator = validateObjectWithConstraints(constraints);
        const validation = validator(o);
        expect(validation).toEqual(
          Failure([
            `Constraints Object Invalid: Object had more than one exlusive key: ['isRequired', 'defaultValue']`,
          ])
        );
        expect(v1.notCalled).toBeTruthy();
      });
    });
  });

  describe(`with a nested constraint object`, () => {
    describe(`that satisfies constraints`, () => {
      // it(`returns a Validation.Success with supplied value`, () => {
      //   const v1 = stubReturnsSuccess(value1);
      //   const o = {
      //     a: value1,
      //   };
      //   const constraints = {
      //     fields: [
      //       {
      //         name: `a`,
      //         validator: v1,
      //         children: {},
      //       },
      //     ],
      //   };
      //   const validator = validateObjectWithConstraints(constraints);
      //   const validation = validator(o);
      //   expect(validation).toEqual(Success(o));
      //   expect(v1.calledWith(value1)).toBeTruthy();
      // });
    });

    describe(`that doesn't satisfy constraints`, () => {
      describe(`with empty children object on validation`, () => {
        it(`returns a Validation.Success with supplied value`, () => {
          const v1 = stubReturnsSuccess(value1);
          const o = {
            a: value1,
          };
          const constraints = {
            fields: [
              {
                name: `a`,
                validator: v1,
                children: {},
              },
            ],
          };
          const validator = validateObjectWithConstraints(constraints);
          const validation = validator(o);
          expect(validation).toEqual(Success(o));
          expect(v1.calledWith(value1)).toBeTruthy();
        });
      });

      //   describe(`with missing required key on item`, () => {
      //     it(`returns a Validation.Failure with message`, () => {
      //       const v1 = stubReturnsSuccess(value1);
      //       const v2 = stubReturnsFailure(message1);
      //       const o = {
      //         a: value1,
      //       };
      //       const constraints = {
      //         fields: [
      //           {
      //             name: `a`,
      //             validator: v1,
      //             isRequired: true,
      //           },
      //           {
      //             name: `b`,
      //             validator: v2,
      //             isRequired: true,
      //           },
      //         ],
      //       };
      //       const validator = validateObjectWithConstraints(constraints);
      //       const validation = validator(o);
      //       expect(validation).toEqual(
      //         Failure([`Object was missing required key(s): ['b']`])
      //       );
      //     });
      //   });
      // });
      // describe(`with both isRequired and defaultValue keys present on an item`, () => {
      //   it(`returns a Validation.Failure with message`, () => {
      //     const v1 = spy();
      //     const o = {
      //       a: 1,
      //     };
      //     const constraints = Object.freeze({
      //       fields: [
      //         {
      //           name: `a`,
      //           validator: v1,
      //           isRequired: true,
      //           defaultValue: true,
      //         },
      //       ],
      //     });
      //     const validator = validateObjectWithConstraints(constraints);
      //     const validation = validator(o);
      //     expect(validation).toEqual(
      //       Failure([
      //         `Constraints Object Invalid: Object had more than one exlusive key: ['isRequired', 'defaultValue']`,
      //       ])
      //     );
      //     expect(v1.notCalled).toBeTruthy();
      //   });
    });
  });
});
