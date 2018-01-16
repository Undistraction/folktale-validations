import { validation as Validation } from 'folktale';
import { validateLengthLessThan } from '../../index';
import { lengthLessThanErrorMessage } from '../../messages';

const { Success, Failure } = Validation;
const value = `xxx`;

describe(`validateLengthLessThan()`, () => {
  describe(`when value is less than maximum length`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const length = 4;
      const validator = validateLengthLessThan(length);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when value is equal to maximum length`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const length = 3;
      const validator = validateLengthLessThan(length);
      const validation = validator(value);
      expect(validation).toEqual(Failure([lengthLessThanErrorMessage(length)]));
    });
  });

  describe(`when value is less than maximum length`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const length = 2;
      const validator = validateLengthLessThan(length);
      const validation = validator(value);
      expect(validation).toEqual(Failure([lengthLessThanErrorMessage(length)]));
    });
  });
});
