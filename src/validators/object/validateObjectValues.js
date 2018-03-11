import { validation as Validation } from 'folktale'
import {
  applyTo,
  prop,
  compose,
  reduce,
  toPairs,
  always,
  pair,
  filter,
  keys,
  when,
  of,
  test,
  tryCatch,
  flip,
  find,
  slice,
  ifElse,
} from 'ramda'
import { isNotUndefined, isNotEmpty, stubUndefined } from 'ramda-adjunct'
import { toObjectError } from '../../utils/failures'
import { dispatch } from '../../utils/function'
import {
  propValue,
  matchWithSuccessOrFailure,
  successOrElse,
} from '../../utils/validations'
import { throwError, validatorError } from '../../errors'
import { STRING_REGEXP_MATCH } from '../../constraints/const'

const { Success, Failure } = Validation

const validateValue = (acc, name, value) =>
  compose(
    matchWithSuccessOrFailure(always(acc), validation =>
      acc.concat(compose(Failure, of, pair(name))(propValue(validation)))
    ),
    tryCatch(applyTo(value), _ => throwError(validatorError(name, value)))
  )

const filterRegExpValidators = compose(filter(test(STRING_REGEXP_MATCH)), keys)

const testName = name => compose(flip(test)(name), RegExp, slice(1, -1))

const validatorFromRegExName = name => validatorsMap =>
  compose(
    ifElse(
      isNotEmpty,
      compose(
        when(isNotUndefined, flip(prop)(validatorsMap)),
        find(testName(name))
      ),
      stubUndefined
    ),
    filterRegExpValidators
  )(validatorsMap)

const valueReducer = validatorsMap => (acc, [name, value]) =>
  compose(
    ifElse(isNotUndefined, validateValue(acc, name, value), always(acc)),
    dispatch([prop(name), validatorFromRegExName(name)])
  )(validatorsMap)

const validateValues = (validatorsMap, o) =>
  reduce(valueReducer(validatorsMap), Success(o))

const validateObjectValues = validatorsMap => o =>
  compose(
    successOrElse(toObjectError),
    validateValues(validatorsMap, o),
    toPairs
  )(o)

export default validateObjectValues
