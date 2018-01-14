import { validation as Validation } from 'folktale';
import sinon from 'sinon';
import { validateArrayElements } from '../../index';

const { Success, Failure } = Validation;

const message1 = `message1`;
const message2 = `message2`;

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
        const v1 = sinon.stub();
        v1.onFirstCall().returns(Failure(message1));
        v1.onSecondCall().returns(Success(message1));
        v1.onThirdCall().returns(Success(message1));
        const validator = validateArrayElements(v1);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([
          `Array contained invalid element(s): '1': message1`,
        ]);
        expect(v1.calledWith(1)).toBeTruthy();
        expect(v1.calledWith(2)).toBeTruthy();
        expect(v1.calledWith(3)).toBeTruthy();
        expect(v1.calledThrice).toBeTruthy();
      });
    });

    describe(`as middle item`, () => {
      it(`returns a Validation.Failiure with messsage`, () => {
        const value = [1, 2, 3];
        const v1 = sinon.stub();
        v1.onFirstCall().returns(Success());
        v1.onSecondCall().returns(Failure(message1));
        v1.onThirdCall().returns(Success());
        const validator = validateArrayElements(v1);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([
          `Array contained invalid element(s): '2': message1`,
        ]);
        expect(v1.calledWith(1)).toBeTruthy();
        expect(v1.calledWith(2)).toBeTruthy();
        expect(v1.calledWith(3)).toBeTruthy();
      });
    });

    describe(`as last item`, () => {
      it(`returns a Validation.Failiure with messsage`, () => {
        const value = [1, 2, 3];
        const v1 = sinon.stub();
        v1.onFirstCall().returns(Success());
        v1.onSecondCall().returns(Success());
        v1.onThirdCall().returns(Failure(message1));
        const validator = validateArrayElements(v1);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([
          `Array contained invalid element(s): '3': message1`,
        ]);
        expect(v1.calledWith(1)).toBeTruthy();
        expect(v1.calledWith(2)).toBeTruthy();
        expect(v1.calledWith(3)).toBeTruthy();
        expect(v1.calledThrice).toBeTruthy();
      });
    });

    describe(`multiple items`, () => {
      it(`returns a Validation.Failiure with messsage`, () => {
        const value = [1, 2, 3];
        const v1 = sinon.stub();
        v1.onFirstCall().returns(Failure(message1));
        v1.onSecondCall().returns(Success());
        v1.onThirdCall().returns(Failure(message2));
        const validator = validateArrayElements(v1);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([
          `Array contained invalid element(s): '1': message1,'3': message2`,
        ]);
        expect(v1.calledWith(1)).toBeTruthy();
        expect(v1.calledWith(2)).toBeTruthy();
        expect(v1.calledWith(3)).toBeTruthy();
        expect(v1.calledThrice).toBeTruthy();
      });
    });
  });
});
