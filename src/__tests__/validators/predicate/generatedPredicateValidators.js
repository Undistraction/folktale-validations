import { validation as Validation } from 'folktale';

import { map, mapObjIndexed, prop, compose, reverse } from 'ramda';
import typeData from '../../testHelpers/fixtures/typeData';

import {
  validateIsArray,
  validateIsNotArray,
  validateIsObject,
  validateIsNotObject,
  validateIsBoolean,
  validateIsNotBoolean,
  validateIsNumber,
  validateIsNotNumber,
  validateIsDate,
  validateIsNotDate,
  validateIsNaN,
  validateIsNotNaN,
  validateIsNil,
  validateIsNull,
  validateIsNotNull,
  validateIsUndefined,
  validateIsNotUndefined,
  validateIsFunction,
  validateIsNotFunction,
  validateIsEmpty,
  validateIsNotEmpty,
  validateIsEmptyString,
  validateIsNonEmptyString,
  validateIsEmptyArray,
  validateIsNonEmptyArray,
  validateIsValidNumber,
  validateIsNotValidNumber,
  validateIsValidDate,
  validateIsNotValidDate,
} from '../../../index';

import { mapObjIndexedWithIndex } from '../../../utils';
import { PREDICATES } from '../../../const';

const { Success, Failure } = Validation;

const validators = {
  // Types
  [PREDICATES.Array]: {
    validators: { validateIsArray, validateIsNotArray },
    values: [typeData.arrayValues, typeData.withoutArrayValues],
  },
  [PREDICATES.Object]: {
    validators: { validateIsObject, validateIsNotObject },
    values: [typeData.objectValues, typeData.withoutObjectValues],
  },
  [PREDICATES.Boolean]: {
    validators: { validateIsBoolean, validateIsNotBoolean },
    values: [typeData.booleanValues, typeData.withoutBooleanValues],
  },
  [PREDICATES.Number]: {
    validators: { validateIsNumber, validateIsNotNumber },
    values: [typeData.numericValues, typeData.withoutNumericValues],
  },
  [PREDICATES.Function]: {
    validators: { validateIsFunction, validateIsNotFunction },
    values: [typeData.functionValues, typeData.withoutFunctionValues],
  },
  [PREDICATES.Date]: {
    validators: { validateIsDate, validateIsNotDate },
    values: [typeData.dateValues, typeData.withoutDateValues],
  },
  [PREDICATES.NaN]: {
    validators: { validateIsNaN, validateIsNotNaN },
    values: [NaN, typeData.withoutNaNValues],
  },
  [PREDICATES.Nil]: {
    validators: { validateIsNil },
    values: [[null, undefined], typeData.withoutNilValues],
  },
  [PREDICATES.Null]: {
    validators: { validateIsNull, validateIsNotNull },
    values: [[null], typeData.withoutNullValues],
  },
  [PREDICATES.Undefined]: {
    validators: { validateIsUndefined, validateIsNotUndefined },
    values: [[undefined], typeData.withoutUndefinedValues],
  },
  // Empty
  [PREDICATES.empty]: {
    validators: { validateIsEmpty, validateIsNotEmpty },
    values: [typeData.emptyValues, typeData.withoutEmptyValues],
  },
  [PREDICATES.emptyString]: {
    validators: { validateIsEmptyString, validateIsNonEmptyString },
    values: [typeData.emptyStringValues, typeData.nonEmptyStringValues],
  },
  [PREDICATES.emptyArray]: {
    validators: { validateIsEmptyArray, validateIsNonEmptyArray },
    values: [typeData.emptyArrayValues, typeData.nonEmptyArrayValues],
  },
  // Valid
  [PREDICATES.validNumber]: {
    validators: { validateIsValidNumber, validateIsNotValidNumber },
    values: [typeData.validNumericValues, typeData.withoutValidNumericValues],
  },
  [PREDICATES.validDate]: {
    validators: { validateIsValidDate, validateIsNotValidDate },
    values: [typeData.validDateValues, typeData.withoutValidDateValues],
  },
};

const prepareTestData = validatorPair =>
  mapObjIndexedWithIndex((validator, name, o, i) => {
    const testValues =
      i === 0
        ? prop(`values`, validatorPair)
        : compose(reverse, prop(`values`))(validatorPair);
    return [name, validator, ...testValues];
  }, prop(`validators`, validatorPair));

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
                expect(validation).toEqual(Success(value));
              }, validValues);
            });
          });
          describe(`when argument is not valid`, () => {
            it(`returns a Validation.Failure with an error message`, () => {
              map(value => {
                const validation = validatorWithMessage(value);
                expect(validation).toEqual(Failure([message]));
              }, invalidValues);
            });
          });
        });
      });
    }, prepareTestData(validatorPair));
  });
}, validators);
