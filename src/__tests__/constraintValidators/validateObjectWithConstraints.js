import { validation as Validation } from 'folktale';
import { validateObjectWithConstraints } from '../../index';
import {
  stubReturnsSuccess,
  stubReturnsFailure,
  spy,
  stubReturns,
} from '../testHelpers/sinon';

const { Success, Failure } = Validation;

const value1 = `value1`;
const value2 = `value2`;
const value3 = `value3`;
const value4 = `value4`;
const value5 = `value5`;
const value6 = `value6`;
const value7 = `value7`;
const value8 = `value8`;
const value9 = `value9`;
const message1 = `message1`;
const transformedValue1 = `transformed1`;
const transformedValue2 = `transformed2`;
const defaultValue1 = `default1`;
const defaultValue2 = `default2`;

// Note: No need to test the validity of the constraints object itself as this
// is well tested in `validateConstraints.js`. These tests should validate that
// given a valid constraint object, the constraints are appled correctly.

describe(`validateObjectWithConstraints`, () => {
  // ---------------------------------------------------------------------------
  // Full nested constraint object with all features
  // ---------------------------------------------------------------------------

  describe(`with a flat constraint object`, () => {
    describe(`that satisfies constraints`, () => {
      it(`returns a Validation.Success with supplied value`, () => {
        const v1 = stubReturnsSuccess(value1);
        const vNotCalled = spy();
        const v3 = stubReturnsSuccess(value3);
        const v5 = stubReturnsSuccess(value5);
        const v6 = stubReturnsSuccess(value6);
        const v7 = stubReturnsSuccess(value7);
        const v8 = stubReturnsSuccess(value8);
        const t1 = stubReturns(transformedValue1);
        const t2 = stubReturns(transformedValue2);
        const o = {
          a: value1,
          c: value3,
          e: [
            {
              f: value4,
              i: value8,
            },
            {
              f: value4,
              i: value8,
              j: value9,
            },
          ],
          g: {
            h: `x`,
          },
        };

        const constraints = {
          fields: [
            {
              name: `a`,
              validator: v1,
              isRequired: true,
              transformer: t1, // Value should be transformed
            },
            {
              name: `b`,
              validator: vNotCalled,
            },
            {
              name: `c`,
              validator: v3,
              defaultValue: defaultValue1,
            },
            {
              name: `d`,
              validator: vNotCalled, // Not run because no value for d
              defaultValue: value2, // Should be applied
            },
            {
              name: `k`,
              validator: vNotCalled, // Not run because no value for d
              defaultValue: defaultValue1, // Should be applied
            },
            {
              name: `g`,
              validator: v7,
              value: {
                fields: [
                  {
                    name: `h`,
                    validator: v6,
                  },
                ],
              },
            },
            {
              name: `e`,
              validator: v5,
              children: {
                fields: [
                  {
                    name: `f`,
                    validator: v5,
                    isRequired: true,
                  },
                  {
                    name: `i`,
                    validator: v8,
                    transformer: t2,
                    isRequired: true,
                  },
                  {
                    name: `j`,
                    validator: v8,
                    defaultValue: defaultValue2,
                  },
                ],
              },
            },
          ],
        };

        const validator = validateObjectWithConstraints(constraints);
        const validation = validator(o);
        expect(validation).toEqual(
          Success({
            a: transformedValue1,
            c: value3,
            d: value2,
            k: defaultValue1,
            g: {
              h: `x`,
            },
            e: [
              {
                f: value4,
                i: transformedValue2,
                j: defaultValue2,
              },
              {
                f: value4,
                i: transformedValue2,
                j: value9,
              },
            ],
          })
        );
        expect(t1.calledWith(value1)).toBeTruthy();
        expect(t2.calledWith(value8)).toBeTruthy();
        expect(v1.calledWith(value1)).toBeTruthy();
        expect(v3.calledWith(value3)).toBeTruthy();
        expect(v5.calledWith(value4)).toBeTruthy();
        expect(vNotCalled.notCalled).toBeTruthy();
      });
    });

    // -------------------------------------------------------------------------
    // One level of constraints
    // -------------------------------------------------------------------------

    describe(`that doesn't satisfy constraints`, () => {
      describe(`empty object`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const v1 = stubReturnsSuccess(value1);
          const v2 = stubReturnsFailure(message1);
          const o = {};

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
          expect(validation).toEqual(Failure([`Object Invalid: Was Empty`]));
          expect(v1.notCalled).toBeTruthy();
          expect(v2.notCalled).toBeTruthy();
        });
      });

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
            Failure([
              `Object Invalid: Object was missing required key(s): ['b']`,
            ])
          );
        });
      });
    });
  });

  describe(`with a nested constraint object`, () => {
    describe(`that satisfies constraints`, () => {
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
            Failure([
              `Object Invalid: Object was missing required key(s): ['b']`,
            ])
          );
        });
      });
    });
  });
});
