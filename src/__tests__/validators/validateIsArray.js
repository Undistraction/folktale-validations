import { validation as Validation } from 'folktale';
import { validateIsArray, configuredValidators } from '../../index';
import { isTypeMessage } from '../../messages';
import { TYPES } from '../../const';

const { Success, Failure } = Validation;

describe(`validateIsArray()`, () => {
  describe(`without configured message`, () => {
    const message = `message`;
    const validator = validateIsArray(message);
    describe(`when argument is a Array`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = [];
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
    const validator = configuredValidators.validateIsArray;
    describe(`when argument is a Array`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = [];
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is not an object`, () => {
      it(`returns a Validation.Failure with configured error message`, () => {
        const validation = validator(`x`);
        const expectedMessage = isTypeMessage(TYPES.Array);
        expect(validation).toEqual(Failure([expectedMessage]));
      });
    });
  });
});
