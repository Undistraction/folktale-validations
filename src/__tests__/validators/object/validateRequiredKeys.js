import { stub } from 'sinon';
import { validation as Validation } from 'folktale';
import { validateRequiredKeys } from '../../../index';

const { Success, Failure } = Validation;

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
      expect(result).toEqual(Failure([message]));
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
      expect(result).toEqual(Success(value));
    });
  });
});
