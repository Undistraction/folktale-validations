import { validation as Validation } from 'folktale';
import sinon from 'sinon';
import { allOfValidator } from '../../index';
import { andErrorMessages } from '../../messages';

const { Success, Failure } = Validation;

const message1 = `message1`;
const message2 = `message2`;
const message3 = `message3`;

describe(`allOfValidator()`, () => {
  describe(`with a valid value`, () => {
    describe(`with all validations succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const value = true;
        const v1 = sinon.stub().returns(Success(value));
        const v2 = sinon.stub().returns(Success(value));
        const v3 = sinon.stub().returns(Success(value));
        const validator = allOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(Success.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual(value);
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
        expect(v3.calledWith(value)).toBeTruthy();
      });
    });
  });
  describe(`with an invalid value`, () => {
    describe(`with first validation failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const value = 1;
        const v1 = sinon.stub().returns(Failure([message1]));
        const v2 = sinon.stub().returns(Success(value));
        const v3 = sinon.stub().returns(Success(value));
        const validator = allOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([message1]);
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
        expect(v3.calledWith(value)).toBeTruthy();
      });
    });

    describe(`with second validation failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const value = 1;
        const v1 = sinon.stub().returns(Success(value));
        const v2 = sinon.stub().returns(Failure([message1]));
        const v3 = sinon.stub().returns(Success(value));
        const validator = allOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([message1]);
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
        expect(v3.calledWith(value)).toBeTruthy();
      });
    });
    describe(`with second validation failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const value = 1;
        const v1 = sinon.stub().returns(Success(value));
        const v2 = sinon.stub().returns(Success(value));
        const v3 = sinon.stub().returns(Failure([message1]));
        const validator = allOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([message1]);
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
        expect(v3.calledWith(value)).toBeTruthy();
      });
    });

    describe(`with all validations failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const value = 1;
        const v1 = sinon.stub().returns(Failure([message1]));
        const v2 = sinon.stub().returns(Failure([message2]));
        const v3 = sinon.stub().returns(Failure([message3]));
        const validator = allOfValidator([v1, v2, v3]);
        const validation = validator(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([
          andErrorMessages([message1, message2, message3]),
        ]);
        expect(v1.calledWith(value)).toBeTruthy();
        expect(v2.calledWith(value)).toBeTruthy();
        expect(v3.calledWith(value)).toBeTruthy();
      });
    });
  });
});
