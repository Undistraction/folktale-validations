import { validateObjectWithConstraints } from '../../../index';
import {
  stubReturnsSuccess,
  stubReturnsFailure,
  spy,
  stubReturns,
} from '../../testHelpers/sinon';
import { CONSTRAINT_FIELD_NAMES, FAILURE_FIELD_NAMES } from '../../../const';
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
  message1,
  transformedValue1,
  transformedValue2,
  defaultValue1,
  defaultValue2,
} from '../../testHelpers/fixtures/constraintValues';

const {
  FIELDS,
  NAME,
  VALIDATOR,
  TRANSFORMER,
  IS_REQUIRED,
  DEFAULT_VALUE,
  VALUE,
  CHILDREN,
} = CONSTRAINT_FIELD_NAMES;

const { FIELDS_FAILURE_MESSAGE } = FAILURE_FIELD_NAMES;

// Note: No need to test the validity of the constraints object itself as this
// is well tested in `validateConstraints.js`. These tests should validate that
// given a valid constraint object, the constraints are appled correctly.

describe(`validateObjectWithConstraints`, () => {
  const validators = validatorsWithMessages;
  const validateObjectWithConstraintsConfigured = validateObjectWithConstraints(
    validators
  );

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
        };

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
        };

        const expectedValue = {
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
        };

        const validator = validateObjectWithConstraintsConfigured(constraints);
        const validation = validator(o);

        expect(validation).toEqualSuccessWithValue(expectedValue);
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
              [NAME]: value1,
              [VALIDATOR]: v1,
            },
            {
              [NAME]: value2,
              [VALIDATOR]: v1,
            },
          ],
        };

        const validator = validateObjectWithConstraintsConfigured(constraints);
        const validation = validator(value);
        expect(validation).toEqualSuccessWithValue(value);
        expect(v1.notCalled).toBeTrue();
      });
    });

    describe(`that doesn't satisfy constraints`, () => {
      describe(`with invalid value`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const v1 = stubReturnsFailure(message1);
          const o = {
            [key1]: value1,
          };

          const constraints = {
            [FIELDS]: [
              {
                [NAME]: key1,
                [VALIDATOR]: v1,
                [IS_REQUIRED]: true,
              },
            ],
          };

          const expectedValue = { [FIELDS]: { [key1]: [message1] } };

          const validator = validateObjectWithConstraintsConfigured(
            constraints
          );
          const validation = validator(o);
          expect(validation).toEqualFailureWithValue(expectedValue);
          expect(v1.calledWith(value1)).toBeTrue();
        });
      });

      describe(`with missing required key on item`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const v1 = stubReturnsSuccess(value1);
          const v2 = stubReturnsFailure(message1);
          const o = {
            [key1]: value1,
          };

          const constraints = {
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
          };

          const expectedValue = {
            [FIELDS_FAILURE_MESSAGE]: [
              `Object was missing required key(s): ['${key2}']`,
            ],
          };

          const validator = validateObjectWithConstraintsConfigured(
            constraints
          );
          const validation = validator(o);
          expect(validation).toEqualFailureWithValue(expectedValue);
        });
      });

      describe(`with invalid key`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const v1 = spy();
          const v2 = spy();
          const o = {
            [key1]: value1,
            [key2]: value2,
            [invalidKeyName]: invalidKeyValue,
          };

          const constraints = {
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
          };

          const expectedValue = {
            [FIELDS_FAILURE_MESSAGE]: [
              `Object included invalid key(s): '[${invalidKeyName}]'`,
            ],
          };

          const validator = validateObjectWithConstraintsConfigured(
            constraints
          );
          const validation = validator(o);
          expect(validation).toEqualFailureWithValue(expectedValue);
          expect(v1.notCalled).toBeTrue();
          expect(v2.notCalled).toBeTrue();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Two levels of constraints
  // ---------------------------------------------------------------------------

  describe(`that doesn't satisfy constraints`, () => {
    describe(`with invalid value`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const v1 = stubReturnsSuccess();
        const v2 = stubReturnsFailure(message1);
        const o = {
          [key1]: {
            [key2]: invalidKeyValue,
          },
        };

        const constraints = {
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
        };

        const expectedValue = {
          [FIELDS]: {
            [key1]: {
              [FIELDS]: {
                [key2]: [message1],
              },
            },
          },
        };

        const validator = validateObjectWithConstraintsConfigured(constraints);
        const validation = validator(o);
        expect(validation).toEqualFailureWithValue(expectedValue);
        expect(
          v1.calledWith({
            [key2]: invalidKeyValue,
          })
        ).toBeTrue();
      });
    });

    describe(`with invalid children`, () => {
      it.only(`returns a Validation.Failure with message`, () => {
        const v1 = stubReturnsSuccess();
        const v2 = stubReturnsFailure(message1);
        const o = {
          [key1]: [
            {
              [key2]: invalidKeyValue,
            },
          ],
        };

        const constraints = {
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
        };

        const expectedValue = {
          [FIELDS]: {
            [key1]: {
              [CHILDREN]: [
                {
                  [FIELDS]: {
                    [key2]: [message1],
                  },
                },
              ],
            },
          },
        };

        const validator = validateObjectWithConstraintsConfigured(constraints);
        const validation = validator(o);
        expect(validation).toEqualFailureWithValue(expectedValue);
      });
    });
  });
});