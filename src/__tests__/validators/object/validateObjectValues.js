import { stub } from 'sinon';
import { validation as Validation } from 'folktale';
import validateObjectValues from '../../../validators/object/validateObjectValues';
import {
  spy,
  stubReturnsFailure,
  stubReturnsSuccess,
} from '../../testHelpers/sinon';
import { toObjectError } from '../../../errors/utils';

const { Failure } = Validation;

describe(`validateObjectValues()`, () => {
  const key1 = 1;
  const key2 = 2;
  const key3 = 2;

  const objectMessage = `objectMessage`;
  const valueMessage = `valueMessage`;
  let validatorWithMessage;
  let objectMessageFunction;
  let valueMessageFunction;

  beforeEach(() => {
    objectMessageFunction = stub().returns(objectMessage);
    valueMessageFunction = stub().returns(valueMessage);
    validatorWithMessage = validateObjectValues(
      objectMessageFunction,
      valueMessageFunction
    );
  });

  describe(`with valid values`, () => {
    describe(`with first value invalid`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const message = `message`;
        const v1 = stubReturnsFailure(message);
        const v2 = stubReturnsSuccess();
        const value = {
          a: key1,
          b: key2,
        };
        const validators = {
          a: v1,
          b: v2,
        };
        const validator = validatorWithMessage(validators);
        const validation = validator(value);

        const expectedValue = toObjectError([[`a`, [message]]]);

        expect(validation).toEqualFailureWithValue(expectedValue);
        expect(v1.calledWith(key1)).toBeTrue();
        expect(v2.calledWith(key2)).toBeTrue();
      });
    });

    describe(`with second value invalid`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const message = `message`;
        const v1 = stubReturnsSuccess();
        const v2 = stubReturnsFailure(message);
        const value = {
          a: key1,
          b: key2,
        };
        const validators = {
          a: v1,
          b: v2,
        };
        const validator = validatorWithMessage(validators);
        const validation = validator(value);

        const expectedValue = toObjectError([[`b`, [message]]]);

        expect(validation).toEqualFailureWithValue(expectedValue);
        expect(v1.calledWith(key1)).toBeTrue();
        expect(v2.calledWith(key2)).toBeTrue();
      });
    });

    describe(`with all values invalid`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const message1 = `message1`;
        const message2 = `message2`;
        const message3 = `message3`;
        const v1 = stubReturnsFailure(message1);
        const v2 = stubReturnsFailure(message2);
        const v3 = stubReturnsFailure(message3);
        const value = {
          a: key1,
          b: key2,
          c: key3,
        };
        const validators = {
          a: v1,
          b: v2,
          c: v3,
        };
        const validator = validatorWithMessage(validators);
        const validation = validator(value);

        const expectedValue = toObjectError([
          [`a`, [message1]],
          [`b`, [message2]],
          [`c`, [message3]],
        ]);

        expect(validation).toEqualFailureWithValue(expectedValue);
        expect(v1.calledWith(key1)).toBeTrue();
        expect(v2.calledWith(key2)).toBeTrue();
        expect(v2.calledWith(key3)).toBeTrue();
      });
    });
  });

  describe(`with valid values`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const v1 = stubReturnsSuccess();
      const v2 = stubReturnsSuccess();
      const value = {
        a: key1,
        b: key2,
      };
      const validators = {
        a: v1,
        b: v2,
      };
      const validator = validatorWithMessage(validators);
      const validation = validator(value);
      expect(validation).toEqualSuccessWithValue(value);
      expect(v1.calledWith(key1)).toBeTrue();
      expect(v2.calledWith(key2)).toBeTrue();
    });
  });

  describe(`with no validator for key`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const v1 = spy();
      const value = {
        a: key1,
      };
      const validators = {};
      const validator = validatorWithMessage(validators);
      const validation = validator(value);
      expect(validation).toEqualSuccessWithValue(value);
      expect(v1.notCalled).toBeTrue();
    });
  });

  describe(`with a validator but no key`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const v1 = spy();
      const value = {
        a: key1,
      };
      const validators = {
        b: v1,
      };
      const validator = validatorWithMessage(validators);
      const validation = validator(value);
      expect(validation).toEqualSuccessWithValue(value);
      expect(v1.notCalled).toBeTrue();
    });
  });
});
