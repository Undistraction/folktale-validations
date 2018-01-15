import { validation as Validation } from 'folktale';

import { validateObjectKeysWithConstraints } from '../../index';
import { invalidKeysErrorMessage } from '../../messages';
import { spy } from '../testHelpers/sinon';

const { Success, Failure } = Validation;

describe(`validateObjectKeysWithConstraints()`, () => {
  describe(`with keys not on whitelist`, () => {
    it(`returns a Validation.Failure with a message for invalid keys`, () => {
      const value = { a: 1, b: 2 };
      const constraints = [];
      const validator = validateObjectKeysWithConstraints(constraints);
      const validation = validator(value);
      expect(validation).toEqual(
        Failure([invalidKeysErrorMessage([`a`, `b`])])
      );
    });
  });

  describe(`with constraints`, () => {
    describe(`satisfied`, () => {
      const v1 = spy();
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
          validator: v1,
          isRequired: true,
        },
      ];

      const validator = validateObjectKeysWithConstraints(constraints);
      const validation = validator(o);
      expect(validation).toEqual(Success(o));
      expect(v1.notCalled).toBeTruthy();
    });

    describe(`with mssing optional keys`, () => {
      const v1 = spy();
      const o = {
        a: 1,
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

      const validator = validateObjectKeysWithConstraints(constraints);
      const validation = validator(o);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation).toEqual(Success(o));
      expect(v1.notCalled).toBeTruthy();
    });

    describe(`not satisfied`, () => {
      describe(`with mssing required keys`, () => {
        const v1 = spy();
        const o = {
          a: 1,
          c: 2,
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
            isRequired: true,
          },
        ];

        const validator = validateObjectKeysWithConstraints(constraints);
        const validation = validator(o);
        expect(validation).toEqual(Failure([invalidKeysErrorMessage([`c`])]));
        expect(v1.notCalled).toBeTruthy();
      });
    });
  });
});
