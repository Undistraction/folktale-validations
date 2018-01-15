import { validation as Validation } from 'folktale';
import { map } from 'ramda';
import validateConstraints from '../../constraintValidators/validateConstraints';
import { CONSTRAINTS } from '../../../lib/constraints';

const { Success, Failure } = Validation;

describe(`validateConstraints`, () => {
  describe(`with invalid constraints`, () => {
    describe(`with invalid constraint array`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const values = [`x`, 5, true, false, null, undefined, NaN, {}, /x/];
        map(value => {
          const validation = validateConstraints(value);
          expect(Failure.hasInstance(validation)).toBeTruthy();
          expect(validation.value).toEqual([`Wasn't type: 'Array'`]);
        }, values);
      });
    });

    describe(`with array containing non-object values`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value = [`x`, false];
        const validation = validateConstraints(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([
          `Array contained invalid element(s): 'x': Wasn't type: 'Object','false': Wasn't type: 'Object'`,
        ]);
      });
    });

    describe(`with empty constraint array`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value = [];
        const validation = validateConstraints(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([`Was Empty`]);
      });
    });

    describe(`with additional keys`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value = [
          {
            name: `x`,
            validator() {},
            a: 1,
          },
        ];
        const validation = validateConstraints(value);
        expect(Failure.hasInstance(validation)).toBeTruthy();
        expect(validation.value).toEqual([
          `Array contained invalid element(s): '[object Object]': Object included invalid key(s): '[a]'`,
        ]);
      });
    });

    describe(`with missing required keys`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const value1 = [
          {
            validator() {},
          },
        ];

        const value2 = [
          {
            name: `x`,
          },
        ];

        const values = [[`name`, value1], [`validator`, value2]];
        map(([name, value]) => {
          const validation = validateConstraints(value);
          expect(Failure.hasInstance(validation)).toBeTruthy();
          expect(validation.value).toEqual([
            `Array contained invalid element(s): '[object Object]': Object was missing required key(s): ['${name}']`,
          ]);
        }, values);
      });
    });
  });

  describe(`with valid constraint obj`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const value = [
        {
          name: `a`,
          validator() {},
          isRequired: true,
          transformer() {},
          default: true,
        },
        {
          name: `b`,
          validator() {},
          isRequired: true,
          transformer() {},
          default: true,
        },
      ];
      const validation = validateConstraints(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
    });
  });

  describe(`with own constraint obj`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const value = CONSTRAINTS;
      const validation = validateConstraints(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
    });
  });
});
