import sinon from 'sinon';
import { validation as Validation } from 'folktale';
import predicateValidator from '../../helpers/predicateValidator';

const { Success, Failure } = Validation;

describe(`predicateValidator`, () => {
  describe(`with a valid value`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const p = sinon.stub().returns(true);
      const value = true;
      const message = `message`;
      const validator = predicateValidator(message, p);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
      expect(p.calledOnce).toBeTruthy();
      expect(p.calledWith(true)).toBeTruthy();
    });
  });

  describe(`with an invalid value`, () => {
    it(`returns a Validation.Failure with a message`, () => {
      const p = sinon.stub().returns(false);
      const value = true;
      const message = `message`;
      const validator = predicateValidator(message, p);
      const validation = validator(value);
      expect(validation).toEqual(Failure([message]));
      expect(p.calledOnce).toBeTruthy();
      expect(p.calledWith(true)).toBeTruthy();
    });
  });
});
