import { validation as Validation } from 'folktale';
import { validateIsValidNumber } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsValidNumber()`, () => {
  describe(`when argument is an Object`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const validation = validateIsValidNumber(1);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(1);
    });
  });

  describe(`when argument is not an object`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const validation = validateIsValidNumber(`x`);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([`Wasn't a valid Number`]);
    });
  });
});
