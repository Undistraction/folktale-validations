import { map, mapObjIndexed, compose, reverse } from 'ramda';

import { mapObjIndexedWithIndex } from '../../../utils';
import validators from '../../testHelpers/validators';
import { propValues, propValidators } from '../../../utils/predicates';

const prepareTestData = validatorPair =>
  mapObjIndexedWithIndex((validator, name, o, i) => {
    const testValues =
      i === 0
        ? propValues(validatorPair)
        : compose(reverse, propValues)(validatorPair);
    return [name, validator, ...testValues];
  }, propValidators(validatorPair));

mapObjIndexed((validatorPair, name) => {
  describe(`validators for '${name}'`, () => {
    map(([validatorName, validator, validValues, invalidValues]) => {
      describe(`${validatorName}()`, () => {
        describe(`without configured message`, () => {
          const message = `message`;
          const validatorWithMessage = validator(message);

          describe(`when argument is valid`, () => {
            it(`returns a Validation.Success with the supplied value`, () => {
              map(value => {
                const validation = validatorWithMessage(value);
                expect(validation).toEqualSuccessWithValue(value);
              }, validValues);
            });
          });
          describe(`when argument is not valid`, () => {
            it(`returns a Validation.Failure with an error message`, () => {
              map(value => {
                const validation = validatorWithMessage(value);
                expect(validation).toEqualFailureWithValue([message]);
              }, invalidValues);
            });
          });
        });
      });
    }, prepareTestData(validatorPair));
  });
}, validators);
