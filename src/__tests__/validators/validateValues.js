import { validation as Validation } from 'folktale';
import validateValues from '../../validators/validateValues';
import {
  spy,
  stubReturnsFailure,
  stubReturnsSuccess,
} from '../testHelpers/sinon';

const { Success, Failure } = Validation;

const key1 = 1;
const key2 = 2;
const key3 = 2;

describe(`validateValues()`, () => {
  describe(`with valid values`, () => {
    describe(`with first value invalid`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const message = `message`;
        const v1 = stubReturnsFailure(message);
        const v2 = stubReturnsSuccess();
        const value = {
          a: key1,
          b: key2,
        };
        const validators = {
          a: v1,
          b: v2,
        };
        const validator = validateValues(validators);
        const validation = validator(value);
        expect(validation).toEqual(
          Failure([`Object included invalid values(s): Key 'a': message`])
        );
        expect(v1.calledWith(key1)).toBeTruthy();
        expect(v2.calledWith(key2)).toBeTruthy();
      });
    });

    describe(`with second value invalid`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const message = `message`;
        const v1 = stubReturnsSuccess();
        const v2 = stubReturnsFailure(message);
        const value = {
          a: key1,
          b: key2,
        };
        const validators = {
          a: v1,
          b: v2,
        };
        const validator = validateValues(validators);
        const validation = validator(value);
        expect(validation).toEqual(
          Failure([`Object included invalid values(s): Key 'b': message`])
        );
        expect(v1.calledWith(key1)).toBeTruthy();
        expect(v2.calledWith(key2)).toBeTruthy();
      });
    });

    describe(`with all values invalid`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const message1 = `message1`;
        const message2 = `message2`;
        const message3 = `message3`;
        const v1 = stubReturnsFailure(message1);
        const v2 = stubReturnsFailure(message2);
        const v3 = stubReturnsFailure(message3);
        const value = {
          a: key1,
          b: key2,
          c: key3,
        };
        const validators = {
          a: v1,
          b: v2,
          c: v3,
        };
        const validator = validateValues(validators);
        const validation = validator(value);
        expect(validation).toEqual(
          Failure([
            `Object included invalid values(s): Key 'a': message1, Key 'b': message2, Key 'c': message3`,
          ])
        );
        expect(v1.calledWith(key1)).toBeTruthy();
        expect(v2.calledWith(key2)).toBeTruthy();
        expect(v2.calledWith(key3)).toBeTruthy();
      });
    });
  });

  describe(`with valid values`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const v1 = stubReturnsSuccess();
      const v2 = stubReturnsSuccess();
      const value = {
        a: key1,
        b: key2,
      };
      const validators = {
        a: v1,
        b: v2,
      };
      const validator = validateValues(validators);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
      expect(v1.calledWith(key1)).toBeTruthy();
      expect(v2.calledWith(key2)).toBeTruthy();
    });
  });

  describe(`with no validator for key`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const v1 = spy();
      const value = {
        a: key1,
      };
      const validators = {};
      const validator = validateValues(validators);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
      expect(v1.notCalled).toBeTruthy();
    });
  });

  describe(`with a validator but no key`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const v1 = spy();
      const value = {
        a: key1,
      };
      const validators = {
        b: v1,
      };
      const validator = validateValues(validators);
      const validation = validator(value);
      expect(validation).toEqual(Success(value));
      expect(v1.notCalled).toBeTruthy();
    });
  });
});
