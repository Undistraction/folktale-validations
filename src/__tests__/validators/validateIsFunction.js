import { validation as Validation } from 'folktale';
import { validateIsFunction } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsFunction()`, () => {
  describe(`when argument is a function`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = function() {};
      const validation = validateIsFunction(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when argument is not an object`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const validation = validateIsFunction();
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation).toEqual(Failure([`Wasn't type: 'Function'`]));
    });
  });
});
