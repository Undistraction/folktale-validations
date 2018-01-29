import { validation as Validation } from 'folktale';
import { validateIsBoolean, configuredValidators } from '../../index';
import { isTypeMessage } from '../../messages';
import { TYPES } from '../../const';

const { Success, Failure } = Validation;

describe(`validateIsBoolean()`, () => {
  describe(`without configured message`, () => {
    const message = `message`;
    const validator = validateIsBoolean(message);
    describe(`when argument is a boolean`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = true;
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is not an object`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const validation = validator(`x`);
        expect(validation).toEqual(Failure([message]));
      });
    });
  });

  describe(`with configured message`, () => {
    const validator = configuredValidators.validateIsBoolean;
    describe(`when argument is a boolean`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = true;
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is not an object`, () => {
      it(`returns a Validation.Failure with configured error message`, () => {
        const validation = validator(`x`);
        const expectedMessage = isTypeMessage(TYPES.Boolean);
        expect(validation).toEqual(Failure([expectedMessage]));
      });
    });
  });
});
