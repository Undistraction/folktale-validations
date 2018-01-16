import { validation as Validation } from 'folktale';
import { validateLengthGreaterThan } from '../../index';
import { lengthGreaterThanErrorMessage } from '../../messages';

const { Success, Failure } = Validation;
const value = `xxx`;

describe(`validateLengthGreaterThan()`, () => {
  describe(`when value is greater than minimum length`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const length = 2;
      const validator = validateLengthGreaterThan(length);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when value is equal to minimum length`, () => {
    it(`returns a Validation.Failure with the supplied value`, () => {
      const length = 3;
      const validator = validateLengthGreaterThan(length);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([lengthGreaterThanErrorMessage(length)])
      );
    });
  });

  describe(`when value is less than minimum length`, () => {
    it(`returns a Validation.Failure with the supplied value`, () => {
      const length = 4;
      const validator = validateLengthGreaterThan(length);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([lengthGreaterThanErrorMessage(length)])
      );
    });
  });
});
