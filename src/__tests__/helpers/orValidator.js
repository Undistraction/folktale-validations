import { validation as Validation } from 'folktale';
import { orValidator } from '../../index';
import {
  stubReturnsSuccess,
  spy,
  stubReturnsFailure,
} from '../testHelpers/sinon';
import { andErrorMessages } from '../../messages';

const { Success, Failure } = Validation;
const value = 1;
const message1 = `message1`;
const message2 = `message2`;

describe(`orValidator()`, () => {
  describe(`with a valid value`, () => {
    describe(`with first validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const v1 = stubReturnsSuccess(value);
        const v2 = spy();
        const validator = orValidator(v1, v2);
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.notCalled).toBeTruthy();
      });
    });
    describe(`with second validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const v1 = stubReturnsFailure(message1);
        const v2 = stubReturnsSuccess(value);
        const validator = orValidator(v1, v2);
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
      });
    });
  });
  describe(`with an invalid value`, () => {
    it(`returns a Validation.Failure`, () => {
      const v1 = stubReturnsFailure(message1);
      const v2 = stubReturnsFailure(message2);
      const validator = orValidator(v1, v2);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([andErrorMessages([message1, message2])])
      );
      expect(v1.calledWith(value)).toBeTruthy();
      expect(v2.calledWith(value)).toBeTruthy();
    });
  });
});
