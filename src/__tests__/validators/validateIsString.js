import { validation as Validation } from 'folktale';
import { validateIsString, configuredValidators } from '../../index';
import { isTypeMessage } from '../../messages';
import { TYPES } from '../../const';

const { Success, Failure } = Validation;

describe(`validateIsString()`, () => {
  describe(`without configured message`, () => {
    const message = `message`;
    describe(`when argument is a String`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = `x`;
        const validation = validateIsString(message)(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is not an object`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const validation = validateIsString(message)(1);
        expect(validation).toEqual(Failure([message]));
      });
    });
  });

  describe(`with configured message`, () => {
    describe(`when argument is a String`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = `x`;
        const validation = configuredValidators.validateIsString(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is not an object`, () => {
      it(`returns a Validation.Failure with configured error message`, () => {
        const validation = configuredValidators.validateIsString(1);
        const expectedMessage = isTypeMessage(TYPES.String);
        expect(validation).toEqual(Failure([expectedMessage]));
      });
    });
  });
});
