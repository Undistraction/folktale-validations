import { validation as Validation } from 'folktale';
import { validateRequiredKeys } from '../../index';
import { missingRequiredKeyErrorMessage } from '../../messages';

const { Success, Failure } = Validation;

describe(`validate required keys`, () => {
  describe(`with missing keys`, () => {
    it(`returns a Success.Failure with message`, () => {
      const requiredKeys = [`a`, `b`, `c`];
      const value = {};
      const validator = validateRequiredKeys(requiredKeys);
      const result = validator(value);
      expect(result).toEqual(
        Failure([missingRequiredKeyErrorMessage(requiredKeys)])
      );
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
      const validator = validateRequiredKeys(requiredKeys);
      const result = validator(value);
      expect(result).toEqual(Success(value));
    });
  });
});
