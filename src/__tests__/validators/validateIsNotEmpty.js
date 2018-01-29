import { validation as Validation } from 'folktale';
import { validateIsNotEmpty } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsNotEmpty()`, () => {
  describe(`without configured message`, () => {
    const message = `message`;
    const validator = validateIsNotEmpty(message);
    describe(`when argument is a not empty array`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = [1];
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is a not empty obj`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = { a: 1 };
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when argument is an empty array`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const value = [];
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation).toEqual(Failure([message]));
      });
    });

    describe(`when argument is an empty array`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const value = {};
        const validation = validator(value);
        expect(validation).toEqual(Failure([message]));
      });
    });
  });
});
