import { validation as Validation } from 'folktale';
import { validateIsValidNumber } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsValidNumber()`, () => {
  describe(`when argument is a valid number`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = 1;
      const validation = validateIsValidNumber(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
    });
  });

  describe(`when argument is not a valid number`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const value = `x`;
      const validation = validateIsValidNumber(value);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([`Wasn't a valid Number`]);
    });
  });
});
