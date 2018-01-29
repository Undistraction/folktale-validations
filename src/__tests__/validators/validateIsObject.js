import { validation as Validation } from 'folktale';
import { validateIsObject, configuredValidators } from '../../index';
import { isTypeMessage } from '../../messages';
import { TYPES } from '../../const';

const { Success, Failure } = Validation;

describe(`validateIsObject()`, () => {
  describe(`without configured message`, () => {
    const message = `message`;
    describe(`when argument is a Object`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = {};
        const validation = validateIsObject(message)(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is not an object`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const validation = validateIsObject(message)(1);
        expect(validation).toEqual(Failure([message]));
      });
    });
  });

  describe(`with configured message`, () => {
    describe(`when argument is a Object`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = {};
        const validation = configuredValidators.validateIsObject(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is not an object`, () => {
      it(`returns a Validation.Failure with configured error message`, () => {
        const validation = configuredValidators.validateIsObject(1);
        const expectedMessage = isTypeMessage(TYPES.Object);
        expect(validation).toEqual(Failure([expectedMessage]));
      });
    });
  });
});
