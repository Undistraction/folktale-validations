import { stub } from 'sinon';
import { validation as Validation } from 'folktale';
import { validateIsLengthGreaterThan } from '../../../index';

const { Success, Failure } = Validation;
const value = `xxx`;

describe(`validateIsLengthGreaterThan()`, () => {
  const message = `message`;
  let messageFunction;
  let validatorWithMessage;

  beforeEach(() => {
    messageFunction = stub().returns(message);
    validatorWithMessage = validateIsLengthGreaterThan(messageFunction);
  });

  describe(`when value is greater than minimum length`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const length = 2;
      const validator = validatorWithMessage(length);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });
  });

  describe(`when value is equal to minimum length`, () => {
    it(`returns a Validation.Failure with the supplied message`, () => {
      const length = 3;
      const validator = validatorWithMessage(length);
      const validation = validator(value);
      expect(validation).toEqual(Failure([message]));
      expect(messageFunction.calledWith(length)).toEqual(true);
    });
  });

  describe(`when value is less than minimum length`, () => {
    it(`returns a Validation.Failure with the supplied message`, () => {
      const length = 4;
      const validator = validatorWithMessage(length);
      const validation = validator(value);
      expect(validation).toEqual(Failure([message]));
      expect(messageFunction.calledWith(length)).toEqual(true);
    });
  });
});
