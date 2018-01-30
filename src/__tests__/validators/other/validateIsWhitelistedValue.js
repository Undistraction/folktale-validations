import { stub } from 'sinon';
import { validateIsWhitelistedValue } from '../../../index';

describe(`validateIsWhitelistedValue()`, () => {
  // Just return the whitelist so we know message has access to it
  const message = `message`;
  const messageFunction = stub().returns(message);
  const whitelist = [`a`, `b`, `c`];
  const validator = validateIsWhitelistedValue(messageFunction, whitelist);

  describe(`when value is in the whitelist`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = `b`;
      const validation = validator(value);
      expect(validation).toEqualSuccessWithValue(value);
    });

    describe(`when value is first item`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = `a`;
        const validation = validator(value);
        expect(validation).toEqualSuccessWithValue(value);
      });
    });

    describe(`when value is last item`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = `c`;
        const validation = validator(value);
        expect(validation).toEqualSuccessWithValue(value);
      });
    });
  });

  describe(`when value is not on the whitelist`, () => {
    describe(`when no value is passed`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const validation = validator();
        expect(validation).toEqualFailureWithValue([message]);
        expect(messageFunction.calledWith(whitelist)).toEqual(true);
      });
    });

    describe(`when value isn't on the whitelist`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const value = `d`;
        const validation = validator(value);
        expect(validation).toEqualFailureWithValue([message]);
        expect(messageFunction.calledWith(whitelist)).toEqual(true);
      });
    });
  });
});
