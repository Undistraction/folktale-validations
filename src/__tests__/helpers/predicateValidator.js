import sinon from 'sinon';
import predicateValidator from '../../helpers/predicateValidator';

describe(`predicateValidator`, () => {
  describe(`with a valid value`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const p = sinon.stub().returns(true);
      const value = true;
      const message = `message`;
      const validator = predicateValidator(message, p);
      const validation = validator(value);
      expect(validation).toEqualSuccessWithValue(value);
      expect(p.calledOnce).toEqual(true);
      expect(p.calledWith(true)).toEqual(true);
    });
  });

  describe(`with an invalid value`, () => {
    it(`returns a Validation.Failure with a message`, () => {
      const p = sinon.stub().returns(false);
      const value = true;
      const message = `message`;
      const validator = predicateValidator(message, p);
      const validation = validator(value);
      expect(validation).toEqualFailureWithValue([message]);
      expect(p.calledOnce).toEqual(true);
      expect(p.calledWith(true)).toEqual(true);
    });
  });
});
