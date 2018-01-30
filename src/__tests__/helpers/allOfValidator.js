import { validation as Validation } from 'folktale';
import { allOfValidator } from '../../index';
import { joinMessagesWithAnd } from '../../messages';
import { stubReturnsSuccess, stubReturnsFailure } from '../testHelpers/sinon';

const message1 = `message1`;
const message2 = `message2`;
const message3 = `message3`;

describe(`allOfValidator()`, () => {
  describe(`with a valid value`, () => {
    describe(`with all validations succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const value = true;
        const v1 = stubReturnsSuccess(value);
        const v2 = stubReturnsSuccess(value);
        const v3 = stubReturnsSuccess(value);
        const validator = allOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(validation).toEqualSuccessWithValue(value);
        expect(v1.calledWith(value)).toEqual(true);
        expect(v2.calledWith(value)).toEqual(true);
        expect(v3.calledWith(value)).toEqual(true);
      });
    });
  });
  describe(`with an invalid value`, () => {
    describe(`with first validation failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const value = 1;
        const v1 = stubReturnsFailure(message1);
        const v2 = stubReturnsSuccess(value);
        const v3 = stubReturnsSuccess(value);
        const validator = allOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(validation).toEqualFailureWithValue([message1]);
        expect(v1.calledWith(value)).toEqual(true);
        expect(v2.calledWith(value)).toEqual(true);
        expect(v3.calledWith(value)).toEqual(true);
      });
    });

    describe(`with second validation failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const value = 1;
        const v1 = stubReturnsSuccess(value);
        const v2 = stubReturnsFailure(message1);
        const v3 = stubReturnsSuccess(value);
        const validator = allOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(validation).toEqualFailureWithValue([message1]);
        expect(v1.calledWith(value)).toEqual(true);
        expect(v2.calledWith(value)).toEqual(true);
        expect(v3.calledWith(value)).toEqual(true);
      });
    });
    describe(`with third validation failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const value = 1;
        const v1 = stubReturnsSuccess(value);
        const v2 = stubReturnsSuccess(value);
        const v3 = stubReturnsFailure(message1);
        const validator = allOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(validation).toEqualFailureWithValue([message1]);
        expect(v1.calledWith(value)).toEqual(true);
        expect(v2.calledWith(value)).toEqual(true);
        expect(v3.calledWith(value)).toEqual(true);
      });
    });

    describe(`with all validations failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const value = 1;
        const v1 = stubReturnsFailure(message1);
        const v2 = stubReturnsFailure(message2);
        const v3 = stubReturnsFailure(message3);
        const validator = allOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(validation).toEqualFailureWithValue([
          joinMessagesWithAnd([message1, message2, message3]),
        ]);
        expect(v1.calledWith(value)).toEqual(true);
        expect(v2.calledWith(value)).toEqual(true);
        expect(v3.calledWith(value)).toEqual(true);
      });
    });
  });
});
