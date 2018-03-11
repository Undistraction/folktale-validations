import {
  ifElse,
  always,
  equals,
  append,
  curry,
  compose,
  juxt,
  converge,
} from 'ramda'
import { compact, stubUndefined } from 'ramda-adjunct'
import untilFailureValidator from '../../helpers/untilFailureValidator'
import validateObjectKeys from './validateObjectKeys'
import applyDefaultsWithConstraints from '../applyDefaultsWithConstraints'
import transformValuesWithConstraints from '../transformValuesWithConstraints'
import { buildValidatorsMap, listRequiredKeys } from '../utils'
import validateFieldsWithValue from './validateFieldsWithValue'
import validateFieldsWithChildren from './validateFieldsWithChildren'
import { pluckName, propFields } from '../../utils/constraints'
import { validateIsPlainObject } from '../../validators/predicate/generatedPredicateValidators'
import validateWhitelistedKeys from '../../validators/object/validateWhitelistedKeys'
import validateRequiredKeys from '../../validators/object/validateRequiredKeys'
import validateObjectValues from '../../validators/object/validateObjectValues'
import { compactList } from '../../utils/array'

const configureValidateRequired = compose(
  validateRequiredKeys,
  listRequiredKeys
)

const configureValidateWhitelistedKeys = ({ whitelistKeys }) =>
  ifElse(
    always(equals(false, whitelistKeys)),
    stubUndefined,
    compose(validateWhitelistedKeys, pluckName)
  )

const configureDefaultFieldValidators = constraints =>
  converge(compactList, [
    configureValidateWhitelistedKeys(constraints),
    configureValidateRequired,
  ])

const configureFieldsValidators = constraints => fields =>
  compose(
    compact,
    append(constraints.fieldsValidator),
    configureDefaultFieldValidators(constraints)
  )(fields)

const validateValues = compose(validateObjectValues, buildValidatorsMap)

const validateKeys = constraints =>
  compose(validateObjectKeys, configureFieldsValidators(constraints))

const validationSteps = constraints =>
  compose(
    juxt([
      validateKeys(constraints),
      validateValues,
      applyDefaultsWithConstraints,
      transformValuesWithConstraints,
      validateFieldsWithValue,
      validateFieldsWithChildren,
    ]),
    propFields
  )(constraints)

const validateObject = curry((constraints, o) =>
  untilFailureValidator([
    validateIsPlainObject,
    ...validationSteps(constraints),
  ])(o)
)
export default validateObject
