import { validation as Validation } from 'folktale';
import sinon from 'sinon';
import chain from '../../utils/chain';

const { Success, Failure } = Validation;

describe(`chain()`, () => {
  describe(`when acc is a Validation.Failure`, () => {
    it(`returns an equal Validation.Faliure`, () => {
      const message = `message`;
      const acc = Failure(message);
      const validator = sinon.spy();
      const result = chain(acc, validator);
      expect(result.equals(acc)).toBeTruthy();
      expect(validator.notCalled).toBeTruthy();
    });
  });

  describe(`when acc is a Validation.Success`, () => {
    describe(`when validator succeeds`, () => {
      it(`returns a Validation.Success`, () => {
        const message = `message`;
        const value = `x`;
        const acc = Success(value);
        const validator = sinon.stub().returns(Failure(message));
        const result = chain(acc, validator);
        expect(Failure.hasInstance(result)).toBeTruthy();
        expect(result.value).toEqual(message);
        expect(validator.calledWith(value)).toBeTruthy();
      });
    });

    describe(`when validator fails`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value = `x`;
        const acc = Success(value);
        const validator = sinon.stub().returns(Success(value));
        const result = chain(acc, validator);
        expect(Success.hasInstance(result)).toBeTruthy();
        expect(result.value).toEqual(value);
        expect(validator.calledWith(value)).toBeTruthy();
      });
    });
  });
});
