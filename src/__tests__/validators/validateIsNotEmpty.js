import { validation as Validation } from 'folktale';
import { validateIsNotEmpty } from '../..';
import { isEmptyErrorMessage } from '../../messages';

const { Success, Failure } = Validation;

describe(`validateIsNotEmpty()`, () => {
  describe(`when argument is a not empty array`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = [1];
      const validation = validateIsNotEmpty(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
    });
  });

  describe(`when argument is a not empty obj`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = { a: 1 };
      const validation = validateIsNotEmpty(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
    });
  });

  describe(`when argument is an empty array`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const value = [];
      const validation = validateIsNotEmpty(value);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([isEmptyErrorMessage()]);
    });
  });

  describe(`when argument is an empty array`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const value = {};
      const validation = validateIsNotEmpty(value);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([isEmptyErrorMessage()]);
    });
  });
});
