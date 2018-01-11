import { validation as Validation } from 'folktale';
import { validateIsUndefined } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsUndefined()`, () => {
  describe(`when argument is a undefined`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const validation = validateIsUndefined();
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(undefined);
    });
  });

  describe(`when argument is not an object`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const value = true;
      const validation = validateIsUndefined(value);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([`Wasn't type: 'Undefined'`]);
    });
  });
});
