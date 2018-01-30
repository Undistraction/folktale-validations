import { stub } from 'sinon';
import { validation as Validation } from 'folktale';
import { validateIsLengthBetween } from '../../../index';

const { Success, Failure } = Validation;

describe(`validateIsLengthBetween()`, () => {
  const value = `xxx`;
  const message = `message`;
  let greaterThanMessageFunction;
  let lessThanMessageFunction;
  let validatorWithMessage;

  beforeEach(() => {
    greaterThanMessageFunction = stub().returns(message);
    lessThanMessageFunction = stub().returns(message);
    validatorWithMessage = validateIsLengthBetween(
      greaterThanMessageFunction,
      lessThanMessageFunction
    );
  });

  describe(`when value is greater than minimum length and less than the maximum length`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const minimumLength = 2;
      const maximumLength = 4;
      const validator = validatorWithMessage(minimumLength, maximumLength);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when value is less than minimum length`, () => {
    it(`returns a Validation.Failure with the supplied value`, () => {
      const minimumLength = 4;
      const maximumLength = 6;
      const validator = validatorWithMessage(minimumLength, maximumLength);
      const validation = validator(value);
      expect(validation).toEqual(Failure([message]));
      expect(greaterThanMessageFunction.calledWith(minimumLength)).toEqual(
        true
      );
    });
  });

  describe(`when value is greater than maximum length`, () => {
    it(`returns a Validation.Failure with the supplied value`, () => {
      const minimumLength = 0;
      const maximumLength = 3;
      const validator = validatorWithMessage(minimumLength, maximumLength);
      const validation = validator(value);
      expect(validation).toEqual(Failure([message]));
      expect(lessThanMessageFunction.calledWith(maximumLength)).toEqual(true);
    });
  });
});
