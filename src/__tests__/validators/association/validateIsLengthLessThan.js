import { stub } from 'sinon';
import { validation as Validation } from 'folktale';
import { validateIsLengthLessThan } from '../../../index';

const { Success, Failure } = Validation;

describe(`validateIsLengthLessThan()`, () => {
  const message = `message`;
  const value = `xxx`;
  let messageFunction;
  let validatorWithMessage;

  beforeEach(() => {
    messageFunction = stub().returns(message);
    validatorWithMessage = validateIsLengthLessThan(messageFunction);
  });

  describe(`when value is less than maximum length`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const length = 4;
      const validator = validatorWithMessage(length);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when value is equal to maximum length`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const length = 3;
      const validator = validatorWithMessage(length);
      const validation = validator(value);
      expect(validation).toEqual(Failure([message]));
      expect(messageFunction.calledWith(length)).toBeTruthy();
    });
  });

  describe(`when value is less than maximum length`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const length = 2;
      const validator = validatorWithMessage(length);
      const validation = validator(value);
      expect(validation).toEqual(Failure([message]));
      expect(messageFunction.calledWith(length)).toBeTruthy();
    });
  });
});
