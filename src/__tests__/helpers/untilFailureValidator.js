import sinon from 'sinon';
import { validation as Validation } from 'folktale';
import { untilFailureValidator } from '../../index';

const { Success, Failure } = Validation;

describe(`untilFailureValidator()`, () => {
  describe(`with invalid input`, () => {
    describe(`with first validator failing`, () => {
      it(`returns a Validation.Failure with error message`, () => {
        const failureMessage = `failed`;
        const value = `x`;
        const v1 = sinon.stub().returns(Failure(failureMessage));
        const v2 = sinon.spy();
        const v3 = sinon.spy();
        const validator = untilFailureValidator([v1, v2, v3]);
        const result = validator(value);
        expect(result).toEqual(Failure(failureMessage));
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.notCalled).toBeTruthy();
        expect(v3.notCalled).toBeTruthy();
      });
    });

    describe(`with second validator failing`, () => {
      it(`returns a Validation.Failure with error message`, () => {
        const failureMessage = `failed`;
        const value = `x`;
        const v1 = sinon.stub().returns(Success(value));
        const v2 = sinon.stub().returns(Failure(failureMessage));
        const v3 = sinon.spy();
        const validator = untilFailureValidator([v1, v2, v3]);
        const result = validator(value);
        expect(result).toEqual(Failure(failureMessage));
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
        expect(v3.notCalled).toBeTruthy();
      });
    });

    describe(`with third validator failing`, () => {
      it(`returns a Validation.Failure with error message`, () => {
        const failureMessage = `failed`;
        const value = `x`;
        const v1 = sinon.stub().returns(Success(value));
        const v2 = sinon.stub().returns(Success(value));
        const v3 = sinon.stub().returns(Failure(failureMessage));
        const validator = untilFailureValidator([v1, v2, v3]);
        const result = validator(value);
        expect(result).toEqual(Failure(failureMessage));
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
        expect(v3.calledWith(value)).toBeTruthy();
      });
    });
  });

  describe(`with valid input`, () => {
    it(`returns a Validation.Success`, () => {
      const value = `x`;
      const v1 = sinon.stub().returns(Success(value));
      const v2 = sinon.stub().returns(Success(value));
      const v3 = sinon.stub().returns(Success(value));
      const validator = untilFailureValidator([v1, v2, v3]);
      const result = validator(value);
      expect(result).toEqual(Success(value));
      expect(v1.calledWith(value)).toBeTruthy();
      expect(v2.calledWith(value)).toBeTruthy();
      expect(v3.calledWith(value)).toBeTruthy();
    });
  });
});
