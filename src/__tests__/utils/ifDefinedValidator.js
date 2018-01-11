import { validation as Validation } from 'folktale';
import sinon from 'sinon';
import { ifDefinedValidator } from '../../index';

const { Success, Failure } = Validation;

describe(`ifDefinedValidator()`, () => {
  describe(`when value is defined`, () => {
    describe(`when value is valid`, () => {
      it(`returns a Validation.Success`, () => {
        const value = true;
        const v1 = sinon.stub().returns(Success(value));
        const validator = ifDefinedValidator(v1);
        const result = validator(value);
        expect(Success.hasInstance(result)).toBeTruthy();
        expect(result.value).toEqual(value);
        expect(v1.calledWithExactly(value)).toBeTruthy();
      });
    });

    describe(`when value is invalid`, () => {
      it(`returns a Validation.Success`, () => {
        const value = true;
        const message = `message`;
        const v1 = sinon.stub().returns(Failure(message));
        const validator = ifDefinedValidator(v1);
        const result = validator(value);
        expect(Failure.hasInstance(result)).toBeTruthy();
        expect(result.value).toEqual([`Wasn't type: 'Undefined' and message`]);
        expect(v1.calledWithExactly(value)).toBeTruthy();
      });
    });
  });

  describe(`when value is undefined`, () => {
    it(`returns a Validation.Success`, () => {
      const v1 = sinon.stub();
      const validator = ifDefinedValidator(v1);
      const result = validator();
      expect(Success.hasInstance(result)).toBeTruthy();
      expect(result.value).toEqual(undefined);
      expect(v1.notCalled).toBeTruthy();
    });
  });
});
