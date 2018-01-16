import { validation as Validation } from 'folktale';
import { gt } from 'ramda';
import { validateLength } from '../../index';
import { isInvalidLengthErrorMessage } from '../../messages';

const { Success, Failure } = Validation;

describe(`validateLength()`, () => {
  describe(`when relation is true based on length`, () => {
    it(`returns a Validation.Success with the supplied value and relation`, () => {
      const value = `abc`;
      const validator = validateLength(gt, 2);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when relation is false based on length`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const value = `a`;
      const validator = validateLength(gt, 2);
      const validation = validator(value);
      expect(validation).toEqual(Failure([isInvalidLengthErrorMessage()]));
    });
  });
});
