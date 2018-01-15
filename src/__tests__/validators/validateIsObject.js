import { validation as Validation } from 'folktale';
import { validateIsObject } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsObject()`, () => {
  describe(`when argument is an Object`, () => {
    it(`returns a Validation.Success with the supplied object`, () => {
      const value = {};
      const validation = validateIsObject(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when argument is not an object`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const validation = validateIsObject();
      expect(validation).toEqual(Failure([`Wasn't type: 'Object'`]));
    });
  });
});
