import { reject, without, concat } from 'ramda';
import { isFunction } from 'util';

const emptyArrayValues = [[]];
const emptyStringValues = [``];
const emptyObjValues = [{}];
const nonEmptyArrayValues = [[1, 2, 3]];
const nonEmptyObjValues = [{ a: 1, b: 2, c: 3 }];
const nonEmptyStringValues = [`a`];
const arrayValues = [...emptyArrayValues, ...nonEmptyArrayValues];
const objectValues = [...emptyObjValues, ...nonEmptyObjValues];
const functionValues = [function() {}];
const regexValues = [/a/];
const stringValues = [...emptyStringValues, ...nonEmptyStringValues];
const validNumericValues = [0, 1, -1];
const numericConstValues = [-Infinity, Infinity, NaN];
const numericValues = concat(validNumericValues, numericConstValues);
const booleanValues = [true, false];
const validDateValues = [new Date()];
const invalidDateValues = [new Date(`x`)];
const dateValues = [...validDateValues, ...invalidDateValues];
const emptyValues = [
  ...emptyArrayValues,
  ...emptyObjValues,
  ...emptyStringValues,
];
const undefinedValues = [undefined];
const nullValues = [null];

const allValues = [
  ...arrayValues,
  ...objectValues,
  ...functionValues,
  ...regexValues,
  ...stringValues,
  ...validNumericValues,
  ...numericValues,
  ...booleanValues,
  ...dateValues,
  ...nullValues,
  ...undefinedValues,
];

const withoutBooleanValues = without(booleanValues, allValues);
const withoutArrayValues = without(arrayValues, allValues);
const withoutObjectValues = without(objectValues, allValues);
const withoutStringValues = without(stringValues, allValues);
const withoutFunctionValues = reject(isFunction, allValues);
const withoutDateValues = without(dateValues, allValues);
const withoutNumericValues = without(numericValues, allValues);
const withoutValidNumericValues = without(validNumericValues, allValues);
const withoutValidDateValues = without(validDateValues, allValues);
const withoutNaNValues = without([NaN], allValues);
const withoutNilValues = without([undefined, null], allValues);
const withoutNullValues = without([null], allValues);
const withoutUndefinedValues = without([undefined], allValues);
const withoutEmptyValues = without(emptyValues, allValues);
const withoutEmptyStringValues = without(emptyStringValues, allValues);
const withoutEmptyarrayValues = without(emptyArrayValues, allValues);

export default {
  arrayValues,
  objectValues,
  functionValues,
  regexValues,
  stringValues,
  numericValues,
  booleanValues,
  dateValues,
  emptyValues,
  emptyStringValues,
  emptyArrayValues,
  nonEmptyArrayValues,
  nonEmptyObjValues,
  nonEmptyStringValues,
  validNumericValues,
  validDateValues,
  invalidDateValues,
  undefinedValues,
  nullValues,
  withoutBooleanValues,
  withoutNumericValues,
  withoutArrayValues,
  withoutObjectValues,
  withoutStringValues,
  withoutFunctionValues,
  withoutDateValues,
  withoutNaNValues,
  withoutNullValues,
  withoutNilValues,
  withoutUndefinedValues,
  withoutEmptyValues,
  withoutEmptyStringValues,
  withoutEmptyarrayValues,
  withoutValidNumericValues,
  withoutValidDateValues,
};
