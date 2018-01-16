import { validation as Validation } from 'folktale';
import { validateObjectWithConstraints } from '../../index';
import { stubReturnsSuccess, stubReturnsFailure } from '../testHelpers/sinon';

const { Success, Failure } = Validation;

describe(`validateObjectWithConstraints`, () => {
  describe(`with a value that satisfies constraints`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const value1 = 1;
      const v1 = stubReturnsSuccess(value1);
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
      expect(validation).toEqual(Success(o));
      expect(v1.calledWith(value1)).toBeTruthy();
    });
  });

  describe(`with a value that doesn't satisfy constraints`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const value1 = 1;
      const message1 = `message1`;
      const v1 = stubReturnsSuccess(value1);
      const v2 = stubReturnsFailure(message1);
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
      expect(validation).toEqual(
        Failure([`Object was missing required key(s): ['b']`])
      );
    });
  });
});
