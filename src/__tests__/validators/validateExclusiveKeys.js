import { validation as Validation } from 'folktale';
import exclusiveKeysValidator from '../../validators/validateExclusiveKeys';
import { exclusiveKeyErrorMessage } from '../../messages';

const { Success, Failure } = Validation;

const key1 = `a`;
const key2 = `b`;
const key3 = `c`;

const value = {
  [key1]: 1,
  [key2]: 2,
  [key3]: 3,
};

describe(`validateExclusiveKeys`, () => {
  describe(`with no exclusive keys defined`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const exlusiveKeys = [];
      const validator = exclusiveKeysValidator(exlusiveKeys);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`with no exclusive keys present`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const exlusiveKeys = [`d`];
      const validator = exclusiveKeysValidator(exlusiveKeys);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`with one exclusive key defined and present`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const exlusiveKeys = [key1];
      const validator = exclusiveKeysValidator(exlusiveKeys);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`with two exclusive key defined and present`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const exlusiveKeys = [key1, key2];
      const validator = exclusiveKeysValidator(exlusiveKeys);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([exclusiveKeyErrorMessage([key1, key2])])
      );
    });
  });

  describe(`with two exclusive key defined and present`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const exlusiveKeys = [key1, key2, key3];
      const validator = exclusiveKeysValidator(exlusiveKeys);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([exclusiveKeyErrorMessage([key1, key2, key3])])
      );
    });
  });
});
