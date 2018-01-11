import { validation as Validation } from 'folktale';
import {
  anyOfValidator,
  validateIsBoolean,
  validateIsValidNumber,
} from '../../index';

const { Success, Failure } = Validation;

describe(`anyOfValidator()`, () => {
  const validator = anyOfValidator([validateIsBoolean, validateIsValidNumber]);
  describe(`with a valid value`, () => {
    describe(`with first validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const value = true;
        const validation = validator(value);
        expect(Success.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual(value);
      });
    });
    describe(`with second validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const value = 1;
        const validation = validator(value);
        expect(Success.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual(value);
      });
    });
  });
  describe(`with an invalid value`, () => {
    it(`returns a Validation.Failure`, () => {
      const value = `x`;
      const validation = validator(value);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([
        `Wasn't type: 'Boolean' and Wasn't a valid Number`,
      ]);
    });
  });
});
