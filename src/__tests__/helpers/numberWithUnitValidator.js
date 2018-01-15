import { validation as Validation } from 'folktale';
import { map } from 'ramda';
import { numberWithUnitValidator } from '../../index';
import { numberWithUnitErrorMessage } from '../../messages';

const { Success, Failure } = Validation;

describe(`numberWithUnitValidator`, () => {
  describe(`when value is valid`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const numbers = [0, 0.5, -0.5, 10, -10];
      map(number => {
        const unit = `xx`;
        const value = `${number}${unit}`;
        const validator = numberWithUnitValidator(unit);
        const result = validator(value);
        expect(result).toEqual(Success(value));
      })(numbers);
    });
  });

  describe(`when value is invalid`, () => {
    describe(`with unitless numbers`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const numbers = [0, 0.5, -0.5, 10, -10];
        map(number => {
          const unit = `px`;
          const value = `${number}`;
          const validator = numberWithUnitValidator(unit);
          const result = validator(value);
          expect(result).toEqual(Failure([numberWithUnitErrorMessage(unit)]));
        })(numbers);
      });
    });

    describe(`with united values`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const numbers = [`0yy`, `0.5y`, `-0.5xy`];
        map(number => {
          const unit = `px`;
          const value = `${number}`;
          const validator = numberWithUnitValidator(unit);
          const result = validator(value);
          expect(Failure.hasInstance(result)).toBeTruthy();
          expect(result).toEqual(Failure([numberWithUnitErrorMessage(unit)]));
        })(numbers);
      });
    });

    describe(`with other invalid values`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const numbers = [[], {}, null, undefined, `s`, /x/, true, false];
        map(number => {
          const unit = `px`;
          const value = `${number}`;
          const validator = numberWithUnitValidator(unit);
          const result = validator(value);
          expect(result).toEqual(Failure([numberWithUnitErrorMessage(unit)]));
        })(numbers);
      });
    });
  });
});
