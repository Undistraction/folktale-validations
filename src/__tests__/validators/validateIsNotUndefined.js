import { validation as Validation } from 'folktale';
import { validateIsNotUndefined } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsNotUndefined()`, () => {
  const message = `message`;
  const validator = validateIsNotUndefined(message);
  describe(`when argument is not undefined`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = true;
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when argument is  undefined`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const validation = validator();
      expect(validation).toEqual(Failure([message]));
    });
  });
});
