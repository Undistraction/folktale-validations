import { validation as Validation } from 'folktale';
import { validateIsArrayOf } from '../../index';
import { spy, stubReturnsSuccess, stub } from '../testHelpers/sinon';

const { Success, Failure } = Validation;

describe(`validateIsArrayOf()`, () => {
  describe(`argument is an array`, () => {
    describe(`when array is empty`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = [];
        const v1 = spy();
        const validator = validateIsArrayOf(v1);
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
        expect(v1.notCalled).toBeTruthy();
      });
    });
  });

  describe(`argument is not an array`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const v1 = spy();
      const validator = validateIsArrayOf(v1);
      const validation = validator();
      expect(validation).toEqual(Failure([`Wasn't type: 'Array'`]));
      expect(v1.notCalled).toBeTruthy();
    });
  });

  describe(`array contains valid items`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = [1, 2, 3];
      const v1 = stubReturnsSuccess();
      const validator = validateIsArrayOf(v1);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
      expect(v1.calledThrice).toBeTruthy();
      expect(v1.calledWith(1)).toBeTruthy();
      expect(v1.calledWith(2)).toBeTruthy();
      expect(v1.calledWith(3)).toBeTruthy();
    });
  });

  describe(`array contains invalid item`, () => {
    it(`returns a Validation.Failiure with messsage`, () => {
      const value = [1, 2, 3];
      const message = `message`;
      const v1 = stub();
      v1.onFirstCall().returns(Success());
      v1.onSecondCall().returns(Success());
      v1.onThirdCall().returns(Failure(message));
      const validator = validateIsArrayOf(v1);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([`Array contained invalid element(s): '3': message`])
      );
      expect(v1.calledWith(1)).toBeTruthy();
      expect(v1.calledWith(2)).toBeTruthy();
      expect(v1.calledWith(3)).toBeTruthy();
      expect(v1.calledThrice).toBeTruthy();
    });
  });
});
