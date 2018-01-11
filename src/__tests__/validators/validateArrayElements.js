import { validation as Validation } from 'folktale';
import sinon from 'sinon';
import { validateArrayElements } from '../../index';

const { Success, Failure } = Validation;

describe(`validateArrayElements()`, () => {
  describe(`when array is empty`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = [];
      const v1 = sinon.spy();
      const validator = validateArrayElements(v1);
      const validation = validator(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
      expect(v1.notCalled).toBeTruthy();
    });
  });

  describe(`when array contains valid items`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = [1, 2, 3];
      const v1 = sinon.stub().returns(Success());
      const validator = validateArrayElements(v1);
      const validation = validator(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
      expect(v1.calledThrice).toBeTruthy();
      expect(v1.calledWith(1)).toBeTruthy();
      expect(v1.calledWith(2)).toBeTruthy();
      expect(v1.calledWith(3)).toBeTruthy();
    });
  });

  describe(`when array contains invalid items`, () => {
    describe(`as first item`, () => {
      it(`returns a Validation.Failiure with messsage`, () => {
        const value = [1, 2, 3];
        const message = `message`;
        const v1 = sinon.stub();
        v1.onFirstCall().returns(Failure(message));
        const validator = validateArrayElements(v1);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual(message);
        expect(v1.calledWith(1)).toBeTruthy();
        expect(v1.calledOnce).toBeTruthy();
      });
    });

    describe(`as middle item`, () => {
      it(`returns a Validation.Failiure with messsage`, () => {
        const value = [1, 2, 3];
        const message = `message`;
        const v1 = sinon.stub();
        v1.onFirstCall().returns(Success());
        v1.onSecondCall().returns(Failure(message));
        const validator = validateArrayElements(v1);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual(message);
        expect(v1.calledWith(1)).toBeTruthy();
        expect(v1.calledWith(2)).toBeTruthy();
        expect(v1.calledTwice).toBeTruthy();
      });
    });

    describe(`as last item`, () => {
      it(`returns a Validation.Failiure with messsage`, () => {
        const value = [1, 2, 3];
        const message = `message`;
        const v1 = sinon.stub();
        v1.onFirstCall().returns(Success());
        v1.onSecondCall().returns(Success());
        v1.onThirdCall().returns(Failure(message));
        const validator = validateArrayElements(v1);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual(message);
        expect(v1.calledWith(1)).toBeTruthy();
        expect(v1.calledWith(2)).toBeTruthy();
        expect(v1.calledWith(3)).toBeTruthy();
        expect(v1.calledThrice).toBeTruthy();
      });
    });
  });
});
