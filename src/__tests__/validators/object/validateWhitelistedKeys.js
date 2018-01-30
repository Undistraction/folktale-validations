import { stub } from 'sinon';
import { validation as Validation } from 'folktale';
import { validateWhitelistedKeys } from '../../../index';

const { Success, Failure } = Validation;

describe(`validateWhitelistedKeys()`, () => {
  const validObject = {
    alpha: 1,
    bravo: 2,
    charlie: 3,
  };

  const invalidObject = {
    alpha: 1,
    bravo: 1,
    delta: 4,
    echo: 5,
  };

  const validKeys = [`alpha`, `bravo`, `charlie`];

  const message = `message`;
  let messageFunction;
  let validatorWithMessage;
  let validateWhitelistedKeysWithKeys;

  beforeEach(() => {
    messageFunction = stub().returns(message);
    validatorWithMessage = validateWhitelistedKeys(messageFunction);
    validateWhitelistedKeysWithKeys = validatorWithMessage(validKeys);
  });

  describe(`when object has only valid keys`, () => {
    it(`returns a Validation.Success with a value of the object`, () => {
      const validation = validateWhitelistedKeysWithKeys(validObject);
      expect(validation).toEqual(Success(validObject));
      expect(messageFunction.notCalled).toEqual(true);
    });
  });

  describe(`when object has only invalid keys`, () => {
    it(`returns a Validation.Failure with a value of an array of the invalid keys`, () => {
      const validation = validateWhitelistedKeysWithKeys(invalidObject);
      expect(validation).toEqual(Failure([message]));
      expect(messageFunction.calledWith([`delta`, `echo`])).toEqual(true);
    });
  });

  describe(`when object has no keys`, () => {
    it(`returns a Validation.Success with a value of the object`, () => {
      const o = {};
      const validation = validateWhitelistedKeysWithKeys({});
      expect(validation).toEqual(Success(o));
    });
  });
});
