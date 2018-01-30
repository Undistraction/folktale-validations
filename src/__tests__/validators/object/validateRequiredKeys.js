import { stub } from 'sinon';
import { validateRequiredKeys } from '../../../index';

describe(`validate required keys`, () => {
  const message = `message`;
  let messageFunction;
  let validatorWithMessage;
  beforeEach(() => {
    messageFunction = stub().returns(message);
    validatorWithMessage = validateRequiredKeys(messageFunction);
  });

  describe(`with missing keys`, () => {
    it(`returns a Success.Failure with message`, () => {
      const requiredKeys = [`a`, `b`, `c`];
      const value = {};
      const validator = validatorWithMessage(requiredKeys);
      const result = validator(value);
      expect(result).toEqualFailureWithValue([message]);
    });
  });

  describe(`with no missing keys`, () => {
    it(`returns a Success.Failure with message`, () => {
      const requiredKeys = [`a`, `b`, `c`];
      const value = {
        a: 1,
        b: 2,
        c: 3,
      };
      const validator = validatorWithMessage(requiredKeys);
      const result = validator(value);
      expect(result).toEqualSuccessWithValue(value);
    });
  });
});
