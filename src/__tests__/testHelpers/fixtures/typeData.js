import { reject, without, concat } from 'ramda'
import { isFunction } from 'util'
import { concatAll } from '../../../utils/array'

const emptyArrayValues = [[]]
const emptyStringValues = [``]
const emptyPlainObjValues = [{}]
const nonEmptyArrayValues = [[1, 2, 3]]
const nonEmptyPlainObjValues = [{ a: 1, b: 2, c: 3 }]
const nonEmptyStringValues = [`a`]
const arrayValues = [...emptyArrayValues, ...nonEmptyArrayValues]
const plainObjectValues = [...emptyPlainObjValues, ...nonEmptyPlainObjValues]
const functionValues = [function() {}]
const regExpValues = [/a/]
const stringValues = [...emptyStringValues, ...nonEmptyStringValues]
const validNumericValues = [0, 0.5, 1, -0.5, -1]
const validNonNegativeNumericValues = [0, 0.5, 1]
const validPositiveNumericValues = [0.5, 1]
const validNonPositiveNumericValues = [-0.5, -1, 0]
const validNegativeNumericValues = [-0.5, -1]
const numericConstValues = [-Infinity, Infinity, NaN]
const positiveNumbers = [100, Infinity]
const negativeNumbers = [-100, -Infinity]
const positiveNumbersIncludingZero = [0, ...positiveNumbers]
const negativeNumbersIncludingZero = [0, ...negativeNumbers]
const numericValues = concat(validNumericValues, numericConstValues)
const booleanValues = [true, false]
const validDateValues = [new Date()]
const invalidDateValues = [new Date(`x`)]
const dateValues = [...validDateValues, ...invalidDateValues]
const emptyValues = [
  ...emptyArrayValues,
  ...emptyPlainObjValues,
  ...emptyStringValues,
]
const undefinedValues = [undefined]
const nullValues = [null]
const objectValues = concat(
  plainObjectValues,
  regExpValues,
  arrayValues,
  dateValues,
  functionValues
)

const falsyValues = [false, 0, ``, null, undefined, NaN]
const integers = [-1, 0, 1]
const nonIntegers = [-1.1, 1.1]

const allValues = [
  ...arrayValues,
  ...plainObjectValues,
  ...functionValues,
  ...regExpValues,
  ...stringValues,
  ...validNumericValues,
  ...numericValues,
  ...booleanValues,
  ...dateValues,
  ...nullValues,
  ...undefinedValues,
]

const truthyValues = without(falsyValues, allValues)

const withoutBooleanValues = without(booleanValues, allValues)
const withoutArrayValues = without(arrayValues, allValues)

const withoutPlainObjectValues = without(plainObjectValues, allValues)
const withoutStringValues = without(stringValues, allValues)
const withoutFunctionValues = reject(isFunction, allValues)
const withoutDateValues = without(dateValues, allValues)
const withoutNumericValues = without(numericValues, allValues)
const withoutValidNumericValues = without(validNumericValues, allValues)
const withoutValidDateValues = without(validDateValues, allValues)
const withoutNaNValues = without([NaN], allValues)
const withoutNilValues = without([undefined, null], allValues)
const withoutNullValues = without([null], allValues)
const withoutUndefinedValues = without([undefined], allValues)
const withoutEmptyValues = without(emptyValues, allValues)
const withoutEmptyStringValues = without(emptyStringValues, allValues)
const withoutEmptyarrayValues = without(emptyArrayValues, allValues)
const withoutRegExpValues = without(regExpValues, allValues)
const withoutObjectValues = without(
  concatAll([
    arrayValues,
    plainObjectValues,
    regExpValues,
    dateValues,
    functionValues,
  ]),
  withoutFunctionValues
)
const withoutTrueValues = without([true], allValues)
const withoutFalseValues = without([false], allValues)
const withoutTruthyValues = [0, NaN, null, undefined, false]
const withoutFalsyValues = [1, [], `abc`]

export default {
  arrayValues,
  objectValues,
  plainObjectValues,
  functionValues,
  regExpValues,
  stringValues,
  numericValues,
  booleanValues,
  dateValues,
  emptyValues,
  emptyStringValues,
  emptyArrayValues,
  nonEmptyArrayValues,
  nonEmptyPlainObjValues,
  nonEmptyStringValues,
  validNumericValues,
  validNonNegativeNumericValues,
  validPositiveNumericValues,
  validNegativeNumericValues,
  validNonPositiveNumericValues,
  validDateValues,
  invalidDateValues,
  undefinedValues,
  nullValues,
  positiveNumbers,
  negativeNumbers,
  positiveNumbersIncludingZero,
  negativeNumbersIncludingZero,
  truthyValues,
  falsyValues,
  integers,
  nonIntegers,
  withoutBooleanValues,
  withoutNumericValues,
  withoutArrayValues,
  withoutObjectValues,
  withoutPlainObjectValues,
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
  withoutRegExpValues,
  withoutTrueValues,
  withoutFalseValues,
  withoutTruthyValues,
  withoutFalsyValues,
}
