import { validation as Validation } from 'folktale';
import { validateKeys } from '../../index';

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

const validateKeysWithKeys = validateKeys(validKeys);

describe(`validateKeys()`, () => {
  describe(`when object has only valid keys`, () => {
    it(`returns a Validation.Success with a value of the object`, () => {
      const validation = validateKeysWithKeys(validObject);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(validObject);
    });
  });

  describe(`when object has only invalid keys`, () => {
    it(`returns a Validation.Failure with a value of an array of the invalid keys`, () => {
      const validation = validateKeysWithKeys(invalidObject);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([
        `Object included invalid key(s): '[delta, echo]'`,
      ]);
    });
  });

  describe(`when object has no keys`, () => {
    it(`returns a Validation.Success with a value of the object`, () => {
      const o = {};
      const validation = validateKeysWithKeys({});
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(o);
    });
  });
});
