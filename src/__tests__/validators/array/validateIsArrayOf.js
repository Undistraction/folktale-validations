import { validation as Validation } from 'folktale';
import { validateIsArrayOf } from '../../../index';
import { spy, stubReturnsSuccess, stub } from '../../testHelpers/sinon';

const { Success, Failure } = Validation;

describe(`validateIsArrayOf()`, () => {
  const isArrayMessage = `isArrayMessage`;
  const arrayElementsMessage = `elementsMessage`;
  const arrayElementMessage = `elementMessage`;

  let arrayElementsMessageFunction;
  let arrayElementMessageFunction;
  let validatorWithMessage;

  beforeEach(() => {
    arrayElementsMessageFunction = stub().returns(arrayElementsMessage);
    arrayElementMessageFunction = stub().returns(arrayElementMessage);
    validatorWithMessage = validateIsArrayOf(
      isArrayMessage,
      arrayElementsMessageFunction,
      arrayElementMessageFunction
    );
  });

  describe(`argument is an array`, () => {
    describe(`when array is empty`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = [];
        const v1 = spy();
        const validator = validatorWithMessage(v1);
        const validation = validator(value);
        expect(validation).toEqualSuccessWithValue(value);
        expect(v1.notCalled).toBeTrue();
      });
    });
  });

  describe(`argument is not an array`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const v1 = spy();
      const validator = validatorWithMessage(v1);
      const validation = validator();
      expect(validation).toEqualFailureWithValue([isArrayMessage]);
      expect(v1.notCalled).toBeTrue();
    });
  });

  describe(`array contains valid items`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = [1, 2, 3];
      const v1 = stubReturnsSuccess();
      const validator = validatorWithMessage(v1);
      const validation = validator(value);
      expect(validation).toEqualSuccessWithValue(value);
      expect(v1.calledThrice).toBeTrue();
      expect(v1.calledWith(1)).toBeTrue();
      expect(v1.calledWith(2)).toBeTrue();
      expect(v1.calledWith(3)).toBeTrue();
    });
  });

  describe(`array contains invalid item`, () => {
    it(`returns a Validation.Failiure with messsage`, () => {
      const value = [1, 2, 3];
      const v1 = stub();
      v1.onFirstCall().returns(Success());
      v1.onSecondCall().returns(Success());
      v1.onThirdCall().returns(Failure(isArrayMessage));
      const validator = validatorWithMessage(v1);
      const validation = validator(value);
      expect(validation).toEqualFailureWithValue([arrayElementsMessage]);
      expect(
        arrayElementsMessageFunction.calledWith([arrayElementMessage])
      ).toBeTrue();
      expect(v1.calledWith(1)).toBeTrue();
      expect(v1.calledWith(2)).toBeTrue();
      expect(v1.calledWith(3)).toBeTrue();
      expect(v1.calledThrice).toBeTrue();
    });
  });
});
