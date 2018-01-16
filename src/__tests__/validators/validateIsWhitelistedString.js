import { validation as Validation } from 'folktale';
import { validateIsWhitelistedString } from '../../index';

const { Success, Failure } = Validation;

describe(`validateIsWhitelistedString()`, () => {
  const whitelist = [`a`, `b`, `c`];
  const validator = validateIsWhitelistedString(whitelist);

  describe(`when value is in the whitelist`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = `b`;
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
    });

    describe(`when value is first item`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = `a`;
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
      });
    });

    describe(`when value is last item`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = `c`;
        const validation = validator(value);
        expect(validation).toEqual(Success(value));
      });
    });
  });

  describe(`when value is not on the whitelist`, () => {
    describe(`when no value is passed`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const validation = validator();
        expect(validation).toEqual(
          Failure([`Value wasn't one of the accepted values: a, b, c`])
        );
      });
    });

    describe(`when value isn't on the whitelist`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const value = `d`;
        const validation = validator(value);
        expect(validation).toEqual(
          Failure([`Value wasn't one of the accepted values: a, b, c`])
        );
      });
    });
  });
});
