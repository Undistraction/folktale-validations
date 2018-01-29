import { validation as Validation } from 'folktale';
import { validateIsFunction, configuredValidators } from '../../index';
import { isTypeMessage } from '../../messages';
import { TYPES } from '../../../lib/const';

const { Success, Failure } = Validation;

describe(`validateIsFunction()`, () => {
  describe(`without configured message`, () => {
    const message = `message`;
    const validator = validateIsFunction(message);
    describe(`when argument is a function`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = function() {};
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is not an object`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const validation = validator();
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation).toEqual(Failure([message]));
      });
    });
  });

  describe(`with configured message`, () => {
    const validator = configuredValidators.validateIsFunction;
    describe(`when argument is a function`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = function() {};
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is not an object`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const validation = validator();
        const expectedMessage = isTypeMessage(TYPES.Function);
        expect(validation).toEqual(Failure([expectedMessage]));
      });
    });
  });
});
