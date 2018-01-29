import { validation as Validation } from 'folktale';

import { map, mapObjIndexed, prop, compose, reverse } from 'ramda';
import typeData from '../testHelpers/fixtures/typeData';

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
} from '../../index';

import { mapObjIndexedWithIndex } from '../../utils';

const { Success, Failure } = Validation;

const validators = {
  // Types
  array: {
    validators: { validateIsArray, validateIsNotArray },
    values: [typeData.arrayValues, typeData.withoutArrayValues],
  },
  object: {
    validators: { validateIsObject, validateIsNotObject },
    values: [typeData.objectValues, typeData.withoutObjectValues],
  },
  boolean: {
    validators: { validateIsBoolean, validateIsNotBoolean },
    values: [typeData.booleanValues, typeData.withoutBooleanValues],
  },
  number: {
    validators: { validateIsNumber, validateIsNotNumber },
    values: [typeData.numericValues, typeData.withoutNumericValues],
  },
  function: {
    validators: { validateIsFunction, validateIsNotFunction },
    values: [typeData.functionValues, typeData.withoutFunctionValues],
  },
  date: {
    validators: { validateIsDate, validateIsNotDate },
    values: [typeData.dateValues, typeData.withoutDateValues],
  },
  nan: {
    validators: { validateIsNaN, validateIsNotNaN },
    values: [NaN, typeData.withoutNaNValues],
  },
  nil: {
    validators: { validateIsNil },
    values: [[null, undefined], typeData.withoutNilValues],
  },
  null: {
    validators: { validateIsNull, validateIsNotNull },
    values: [[null], typeData.withoutNullValues],
  },
  undefined: {
    validators: { validateIsUndefined, validateIsNotUndefined },
    values: [[undefined], typeData.withoutUndefinedValues],
  },
  // Empty
  empty: {
    validators: { validateIsEmpty, validateIsNotEmpty },
    values: [typeData.emptyValues, typeData.withoutEmptyValues],
  },
  emptyString: {
    validators: { validateIsEmptyString, validateIsNonEmptyString },
    values: [typeData.emptyStringValues, typeData.nonEmptyStringValues],
  },
  emptyArray: {
    validators: { validateIsEmptyArray, validateIsNonEmptyArray },
    values: [typeData.emptyArrayValues, typeData.nonEmptyArrayValues],
  },
  // Valid
  validNumber: {
    validators: { validateIsValidNumber, validateIsNotValidNumber },
    values: [typeData.validNumericValues, typeData.withoutValidNumericValues],
  },
  validDate: {
    validators: { validateIsValidDate, validateIsNotValidDate },
    values: [typeData.validDateValues, typeData.withoutValidDateValues],
  },

  // isEmpty,
  // isNotEmpty,
  // isEmptyArray,
  // isNonEmptyArray,
  // isEmptyString,
  // isNonEmptyString,
  // isFalsy,
  // isTruthy,
  // isFinite,
  // isNotFinite,
  // isFloat,
  // isNotFloat,

  // isInteger,
  // isNotInteger,
  // isPair,
  // isNotPair,
  // isPlainObj,
  // isNotPlainObj,
  // isValidDate,
  // isNotValidDate,
  // isValidNumber,
  // isNotValidNumber,
};

const pairToTestData = validatorPair =>
  mapObjIndexedWithIndex((validator, name, o, i) => {
    const testValues =
      i === 0
        ? prop(`values`, validatorPair)
        : compose(reverse, prop(`values`))(validatorPair);

    const r = [name, validator, ...testValues];
    return r;
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
    }, pairToTestData(validatorPair));
  });
}, validators);
