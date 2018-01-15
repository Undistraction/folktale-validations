import { validation as Validation } from 'folktale';
import sinon from 'sinon';
import validateObjectWithConstraints from '../../constraintValidators/validateObjectWithConstraints';

const { Success, Failure } = Validation;

describe(`validateObjectWithConstraints`, () => {
  describe(`with a value that satisfies constraints`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const value1 = 1;
      const v1 = sinon.stub().returns(Success(value1));
      const o = {
        a: value1,
      };

      const constraints = [
        {
          name: `a`,
          validator: v1,
          isRequired: true,
        },
        {
          name: `b`,
          validator: v1,
        },
      ];

      const validator = validateObjectWithConstraints(constraints);
      const validation = validator(o);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(o);
      expect(v1.calledWith(value1)).toBeTruthy();
    });

    // describe(`with children`, () => {
    //   const value1 = 1;
    //   const value2 = 2;
    //   const value3 = 3;
    //   const v1 = sinon.stub().returns(Success(value1));
    //   const v2 = sinon.stub().returns(Success(value2));
    //   const o = {
    //     a: value1,
    //     b: [{ c: value2 }, { c: value3 }],
    //   };

    //   const constraints = [
    //     {
    //       name: `a`,
    //       validator: v1,
    //       isRequired: true,
    //     },
    //     {
    //       name: `b`,
    //       children: {
    //         name: `c`,
    //         validator: v2,
    //         isRequired: true,
    //       },
    //     },
    //   ];

    //   const validator = validateObjectWithConstraints(constraints);
    //   const validation = validator(o);
    //   expect(Success.hasInstance(validation)).toBeTruthy();
    //   expect(validation.value).toEqual(o);
    //   expect(v1.calledWith(value1)).toBeTruthy();
    //   expect(v2.calledWith(value2)).toBeTruthy();
    //   expect(v2.calledWith(value3)).toBeTruthy();
    // });
  });

  describe(`with a value that doesn't satisfy constraints`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const value1 = 1;
      const message1 = `message1`;
      const v1 = sinon.stub().returns(Success(value1));
      const v2 = sinon.stub().returns(Failure(message1));
      const o = {
        a: value1,
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

      const validator = validateObjectWithConstraints(constraints);
      const validation = validator(o);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([
        `Object was missing required key(s): ['b']`,
      ]);
    });
  });
});
