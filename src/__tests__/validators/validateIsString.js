import { validation as Validation } from 'folktale';
import { validateIsString } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsString()`, () => {
  describe(`when argument is a string`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = `x`;
      const validation = validateIsString(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
    });
  });

  describe(`when argument is not an object`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const validation = validateIsString();
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([`Wasn't type: 'String'`]);
    });
  });
});
