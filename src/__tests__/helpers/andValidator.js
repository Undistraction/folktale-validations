import { validation as Validation } from 'folktale';
import { andValidator } from '../../index';
import { stubReturnsSuccess, stubReturnsFailure } from '../testHelpers/sinon';
import { andErrorMessages } from '../../messages';

const { Success, Failure } = Validation;
const value = 1;
const message1 = `message1`;
const message2 = `message2`;

describe(`andValidator()`, () => {
  describe(`with a valid value`, () => {
    it(`returns a Validation.Success`, () => {
      const v1 = stubReturnsSuccess(value);
      const v2 = stubReturnsSuccess(value);
      const validator = andValidator(v1, v2);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
      expect(v1.calledWith(value)).toBeTruthy();
      expect(v1.calledWith(value)).toBeTruthy();
    });
  });
  describe(`with an invalid value`, () => {
    describe(`with first validations failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const v1 = stubReturnsFailure(message1);
        const v2 = stubReturnsSuccess(value);
        const validator = andValidator(v1, v2);
        const validation = validator(value);
        expect(validation).toEqual(Failure([message1]));
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
      });
    });
  });

  describe(`with second validations failing`, () => {
    it(`returns a Validation.Failure`, () => {
      const v1 = stubReturnsSuccess(value);
      const v2 = stubReturnsFailure(message1);
      const validator = andValidator(v1, v2);
      const validation = validator(value);
      expect(validation).toEqual(Failure([message1]));
      expect(v1.calledWith(value)).toBeTruthy();
      expect(v2.calledWith(value)).toBeTruthy();
    });
  });

  describe(`with both validations failing`, () => {
    it(`returns a Validation.Failure`, () => {
      const v1 = stubReturnsFailure(message1);
      const v2 = stubReturnsFailure(message2);
      const validator = andValidator(v1, v2);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([andErrorMessages([message1, message2])])
      );
      expect(v1.calledWith(value)).toBeTruthy();
      expect(v2.calledWith(value)).toBeTruthy();
    });
  });
});
