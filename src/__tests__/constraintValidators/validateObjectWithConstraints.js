import { validation as Validation } from 'folktale';
import { validateObjectWithConstraints } from '../../index';
import {
  stubReturnsSuccess,
  stubReturnsFailure,
  spy,
} from '../testHelpers/sinon';

const { Success, Failure } = Validation;

describe(`validateObjectWithConstraints`, () => {
  describe(`with a flat value`, () => {
    describe(`that satisfies constraints`, () => {
      it(`returns a Validation.Success with supplied value`, () => {
        const value1 = 1;
        const v1 = stubReturnsSuccess(value1);
        const o = {
          a: value1,
        };

        const constraints = {
          fields: [
            {
              name: `a`,
              validator: v1,
              isRequired: true,
            },
            {
              name: `b`,
              validator: v1,
            },
          ],
        };

        const validator = validateObjectWithConstraints(constraints);
        const validation = validator(o);
        expect(validation).toEqual(Success(o));
        expect(v1.calledWith(value1)).toBeTruthy();
      });
    });

    describe(`that doesn't satisfy constraints`, () => {
      describe(`with missing required key on item`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const value1 = 1;
          const message1 = `message1`;
          const v1 = stubReturnsSuccess(value1);
          const v2 = stubReturnsFailure(message1);
          const o = {
            a: value1,
          };

          const constraints = {
            fields: [
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
            ],
          };

          const validator = validateObjectWithConstraints(constraints);
          const validation = validator(o);
          expect(validation).toEqual(
            Failure([`Object was missing required key(s): ['b']`])
          );
        });
      });

      describe(`with both isRequired and defaultValue keys present on an item`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const v1 = spy();
          const o = {
            a: 1,
          };

          const constraints = {
            fields: [
              {
                name: `a`,
                validator: v1,
                isRequired: true,
                defaultValue: true,
              },
            ],
          };

          const validator = validateObjectWithConstraints(constraints);
          const validation = validator(o);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: Array contained invalid element(s): '[object Object]': Object had more than one exlusive key: ['isRequired', 'defaultValue']`,
            ])
          );
          expect(v1.notCalled).toBeTruthy();
        });
      });

      describe(`with both value and children keys present on an item`, () => {
        it(`returns a Validation.Failure with message`, () => {
          const v1 = spy();
          const o = {
            a: 1,
          };

          const constraints = {
            fields: [
              {
                name: `a`,
                validator: v1,
                value: true,
                children: true,
              },
            ],
          };

          const validator = validateObjectWithConstraints(constraints);
          const validation = validator(o);
          expect(validation).toEqual(
            Failure([
              `Constraints Object Invalid: Array contained invalid element(s): '[object Object]': Object had more than one exlusive key: ['value', 'children']`,
            ])
          );
          expect(v1.notCalled).toBeTruthy();
        });
      });
    });
  });
});
