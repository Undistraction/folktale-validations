import { validation as Validation } from 'folktale';
import { validateWhitelistedKeys } from '../../index';

const { Success, Failure } = Validation;

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

const validateWhitelistedKeysWithKeys = validateWhitelistedKeys(validKeys);

describe(`validateWhitelistedKeys()`, () => {
  describe(`when object has only valid keys`, () => {
    it(`returns a Validation.Success with a value of the object`, () => {
      const validation = validateWhitelistedKeysWithKeys(validObject);
      expect(validation).toEqual(Success(validObject));
    });
  });

  describe(`when object has only invalid keys`, () => {
    it(`returns a Validation.Failure with a value of an array of the invalid keys`, () => {
      const validation = validateWhitelistedKeysWithKeys(invalidObject);
      expect(validation).toEqual(
        Failure([`Object included invalid key(s): '[delta, echo]'`])
      );
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
