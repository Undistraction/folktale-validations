import { validation as Validation } from 'folktale';
import { validateIsNotUndefined } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsNotUndefined()`, () => {
  describe(`when argument is not undefined`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = true;
      const validation = validateIsNotUndefined(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when argument is  undefined`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const validation = validateIsNotUndefined();
      expect(validation).toEqual(Failure([`Was type: 'Undefined'`]));
    });
  });
});
