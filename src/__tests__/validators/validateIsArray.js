import { validation as Validation } from 'folktale';
import { validateIsArray } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsArray()`, () => {
  describe(`when argument is a array`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = [];
      const validation = validateIsArray(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when argument is not an array`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const validation = validateIsArray();
      expect(validation).toEqual(Failure([`Wasn't type: 'Array'`]));
    });
  });
});
