import { validation as Validation } from 'folktale';
import { toFieldErrorMessage } from '../../utils';
import { withField } from '../../index';

const { Success, Failure } = Validation;

describe(`withField()`, () => {
  describe(`for failed validations`, () => {
    it(`adds the field info before the message`, () => {
      const message = `message`;
      const field = `field`;
      const validation = Failure(message);
      const result = withField(field, validation);

      expect(Failure.hasInstance(result)).toBeTruthy();
      expect(result.value).toEqual(toFieldErrorMessage(field, message));
    });
  });

  describe(`for succeeded validations`, () => {
    it(`leaves the validation untouched`, () => {
      const value = true;
      const field = `field`;
      const validation = Success(value);
      const result = withField(field, validation);

      expect(result).toEqual(validation);
      expect(Success.hasInstance(result)).toBeTruthy();
      expect(result.value).toEqual(value);
    });
  });
});
