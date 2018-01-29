import { validation as Validation } from 'folktale';
import { validateIsValidNumber } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsValidNumber()`, () => {
  const message = `message`;
  const validator = validateIsValidNumber(message);
  describe(`when argument is a valid number`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = 1;
      const validation = validator(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when argument is not a valid number`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const value = `x`;
      const validation = validator(value);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation).toEqual(Failure([message]));
    });
  });
});
