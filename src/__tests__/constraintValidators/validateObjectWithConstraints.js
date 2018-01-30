import { validateObjectWithConstraints } from '../../index';
import {
  stubReturnsSuccess,
  stubReturnsFailure,
  spy,
  stubReturns,
} from '../testHelpers/sinon';
import { FIELD_NAMES } from '../../const';

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

const {
  FIELDS,
  NAME,
  VALIDATOR,
  TRANSFORMER,
  IS_REQUIRED,
  DEFAULT_VALUE,
  VALUE,
  CHILDREN,
} = FIELD_NAMES;

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
        const spyNotCalled1 = spy();
        const spyNotCalled2 = spy();
        const spyNotCalled3 = spy();
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
          [FIELDS]: [
            {
              [NAME]: `a`,
              [VALIDATOR]: v1,
              [IS_REQUIRED]: true,
              [TRANSFORMER]: t1, // Value should be transformed
            },
            {
              [NAME]: `b`,
              [VALIDATOR]: spyNotCalled1,
            },
            {
              [NAME]: `c`,
              [VALIDATOR]: v3,
              [DEFAULT_VALUE]: defaultValue1,
            },
            {
              [NAME]: `d`,
              [VALIDATOR]: spyNotCalled1, // Not run because no value
              [DEFAULT_VALUE]: value2, // Should be applied instead
            },
            {
              [NAME]: `k`,
              [VALIDATOR]: spyNotCalled1, // Not run because no value
              [DEFAULT_VALUE]: defaultValue1, // Should be applied instead
            },
            {
              [NAME]: `g`,
              [VALIDATOR]: v7,
              [VALUE]: {
                [FIELDS]: [
                  {
                    [NAME]: `h`,
                    [VALIDATOR]: v6,
                  },
                ],
              },
            },
            {
              [NAME]: `e`,
              [VALIDATOR]: v5,
              [CHILDREN]: {
                [FIELDS]: [
                  {
                    [NAME]: `f`,
                    [VALIDATOR]: v5,
                    [IS_REQUIRED]: true,
                  },
                  {
                    [NAME]: `i`,
                    [VALIDATOR]: v8,
                    [TRANSFORMER]: t2,
                    [IS_REQUIRED]: true,
                  },
                  {
                    [NAME]: `j`,
                    [VALIDATOR]: v8,
                    [DEFAULT_VALUE]: defaultValue2,
                  },
                ],
              },
            },
            {
              [NAME]: `l`,
              [VALIDATOR]: spyNotCalled2,
              [TRANSFORMER]: spyNotCalled3, // Transformer should not be called
            },
          ],
        };

        const validator = validateObjectWithConstraints(constraints);
        const validation = validator(o);
        expect(validation).toEqualSuccessWithValue({
          a: transformedValue1,
          c: value3,
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
          g: {
            h: `x`,
          },
          d: value2,
          k: defaultValue1,
        });

        expect(t1.calledWith(value1)).toBeTrue();
        expect(t2.calledWith(value8)).toBeTrue();
        expect(v1.calledWith(value1)).toBeTrue();
        expect(v3.calledWith(value3)).toBeTrue();
        expect(v5.calledWith(value4)).toBeTrue();
        expect(spyNotCalled1.notCalled).toBeTrue();
        expect(spyNotCalled2.notCalled).toBeTrue();
        expect(spyNotCalled3.notCalled).toBeTrue();
      });
    });

    // -------------------------------------------------------------------------
    // One level of constraints
    // -------------------------------------------------------------------------

    describe(`empty object`, () => {
      it(`returns a Validation.Success with message`, () => {
        const v1 = stubReturnsSuccess(value1);
        const value = {};

        const constraints = {
          [FIELDS]: [
            {
              [NAME]: `a`,
              [VALIDATOR]: v1,
            },
            {
              [NAME]: `b`,
              [VALIDATOR]: v1,
            },
          ],
        };

        const validator = validateObjectWithConstraints(constraints);
        const validation = validator(value);
        expect(validation).toEqualSuccessWithValue(value);
        expect(v1.notCalled).toBeTrue();
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
            [FIELDS]: [
              {
                [NAME]: `a`,
                [VALIDATOR]: v1,
                [IS_REQUIRED]: true,
              },
              {
                [NAME]: `b`,
                [VALIDATOR]: v2,
                [IS_REQUIRED]: true,
              },
            ],
          };

          const validator = validateObjectWithConstraints(constraints);
          const validation = validator(o);
          expect(validation).toEqualFailureWithValue([
            `Object Invalid: Object was missing required key(s): ['b']`,
          ]);
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
          [FIELDS]: [
            {
              [NAME]: `a`,
              [VALIDATOR]: v1,
              [CHILDREN]: {},
            },
          ],
        };
        const validator = validateObjectWithConstraints(constraints);
        const validation = validator(o);
        expect(validation).toEqualSuccessWithValue(o);
        expect(v1.calledWith(value1)).toBeTrue();
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
            [FIELDS]: [
              {
                [NAME]: `a`,
                [VALIDATOR]: v1,
                [CHILDREN]: {},
              },
            ],
          };
          const validator = validateObjectWithConstraints(constraints);
          const validation = validator(o);
          expect(validation).toEqualSuccessWithValue(o);
          expect(v1.calledWith(value1)).toBeTrue();
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
            [FIELDS]: [
              {
                [NAME]: `a`,
                [VALIDATOR]: v1,
                [IS_REQUIRED]: true,
              },
              {
                [NAME]: `b`,
                [VALIDATOR]: v2,
                [IS_REQUIRED]: true,
              },
            ],
          };
          const validator = validateObjectWithConstraints(constraints);
          const validation = validator(o);
          expect(validation).toEqualFailureWithValue([
            `Object Invalid: Object was missing required key(s): ['b']`,
          ]);
        });
      });
    });
  });
});
