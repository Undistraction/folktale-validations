import { validation as Validation } from 'folktale';
import sinon from 'sinon';
import validateObjectValuesWithConstraints from '../../constraintValidators/validateObjectValuesWithConstraints';

const { Success, Failure } = Validation;

describe(`validateObjectValuesWithConstraints()`, () => {
  describe(`with valid values`, () => {
    it(`returns a Validation.Success`, () => {
      const value1 = 1;
      const value2 = 2;
      const v1 = sinon.stub().returns(Success(value1));
      const v2 = sinon.stub().returns(Success(value2));
      const o = {
        a: 1,
        b: 2,
      };

      const constraints = [
        {
          name: `a`,
          validator: v1,
          isRequired: true,
        },
        {
          name: `b`,
          validator: v2,
          isRequired: true,
        },
      ];

      const validator = validateObjectValuesWithConstraints(constraints);
      const validation = validator(o);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(o);
      expect(v1.calledWith(value1)).toBeTruthy();
      expect(v2.calledWith(value2)).toBeTruthy();
    });

    describe(`with transformers`, () => {
      it.only(`returns a Validation.Success with transformed values`, () => {
        const value1 = 1;
        const value2 = 2;
        const v1 = sinon.stub().returns(Success(value1));
        const v2 = sinon.stub().returns(Success(value2));
        const t1 = sinon.stub().returns(`t1 transformed ${value1}`);
        const t2 = sinon.stub().returns(`t2 transformed ${value2}`);
        const o = {
          a: value1,
          b: value2,
        };

        const constraints = [
          {
            name: `a`,
            validator: v1,
            transformer: t1,
            isRequired: true,
          },
          {
            name: `b`,
            validator: v2,
            transformer: t2,
            isRequired: true,
          },
        ];

        const validator = validateObjectValuesWithConstraints(constraints);
        const validation = validator(o);
        expect(Success.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual({
          a: `t1 transformed ${value1}`,
          b: `t2 transformed ${value2}`,
        });
        console.log(`t1 calls`, t1.calls);
        expect(v1.calledWith(value1)).toBeTruthy();
        expect(v2.calledWith(value2)).toBeTruthy();
        expect(t1.calledWith(value1)).toBeTruthy();
        expect(t2.calledWith(value2)).toBeTruthy();
      });
    });
  });

  describe(`with invalid values`, () => {
    it(`returns a Validation.Failure`, () => {
      const value1 = 1;
      const value2 = 2;
      const message1 = `message1`;
      const message2 = `message2`;
      const v1 = sinon.stub().returns(Failure(message1));
      const v2 = sinon.stub().returns(Failure(message2));
      const o = {
        a: 1,
        b: 2,
      };

      const constraints = [
        {
          name: `a`,
          validator: v1,
          isRequired: true,
        },
        {
          name: `b`,
          validator: v2,
          isRequired: true,
        },
      ];

      const validator = validateObjectValuesWithConstraints(constraints);
      const validation = validator(o);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([
        `Object included invalid values(s): Key 'a': message1, Key 'b': message2`,
      ]);
      expect(v1.calledWith(value1)).toBeTruthy();
      expect(v2.calledWith(value2)).toBeTruthy();
    });
  });
});
