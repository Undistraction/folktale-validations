import { validation as Validation } from 'folktale';
import { validateLengthBetween } from '../../index';
import {
  lengthGreaterThanErrorMessage,
  lengthLessThanErrorMessage,
} from '../../messages';

const { Success, Failure } = Validation;
const value = `xxx`;

describe(`validateLengthBetween()`, () => {
  describe(`when value is greater than minimum length and less than the maximum length`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const minimumLength = 2;
      const maximumLength = 4;
      const validator = validateLengthBetween(minimumLength, maximumLength);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when value is less than minimum length`, () => {
    it(`returns a Validation.Failure with the supplied value`, () => {
      const minimumLength = 4;
      const maximumLength = 6;
      const validator = validateLengthBetween(minimumLength, maximumLength);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([lengthGreaterThanErrorMessage(minimumLength)])
      );
    });
  });

  describe(`when value is greater than maximum length`, () => {
    it(`returns a Validation.Failure with the supplied value`, () => {
      const minimumLength = 0;
      const maximumLength = 3;
      const validator = validateLengthBetween(minimumLength, maximumLength);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([lengthLessThanErrorMessage(maximumLength)])
      );
    });
  });
});
