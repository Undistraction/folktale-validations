import { validation as Validation } from 'folktale';
import { validateIsBoolean } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsBoolean()`, () => {
  describe(`when argument is a boolean`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = true;
      const validation = validateIsBoolean(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
    });
  });

  describe(`when argument is not an object`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const validation = validateIsBoolean();
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([`Wasn't type: 'Boolean'`]);
    });
  });
});
