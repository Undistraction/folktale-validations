import { validation as Validation } from 'folktale';
import { validateIsUndefined } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsUndefined()`, () => {
  const message = `message`;
  const validator = validateIsUndefined(message);
  describe(`when argument is undefined`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const validation = validator();
      expect(validation).toEqual(Success(undefined));
    });
  });

  describe(`when argument is not undefined`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const value = true;
      const validation = validator(value);
      expect(validation).toEqual(Failure([message]));
    });
  });
});
