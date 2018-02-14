import { curry, compose, juxt, of, concat, defaultTo } from 'ramda'
import untilFailureValidator from '../../helpers/untilFailureValidator'
import validateObjectKeys from './validateObjectKeys'
import applyDefaultsWithConstraints from '../applyDefaultsWithConstraints'
import transformValuesWithConstraints from '../transformValuesWithConstraints'
import { buildValidatorsMap, listRequiredKeys } from '../utils'
import { compact } from '../../utils/array'
import validateFieldsWithValue from './validateFieldsWithValue'
import validateFieldsWithChildren from './validateFieldsWithChildren'
import { pluckName } from '../../utils/constraints'
import { validateIsPlainObject } from '../../validators/predicate/generatedPredicateValidators'
import validateWhitelistedKeys from '../../validators/object/validateWhitelistedKeys'
import validateRequiredKeys from '../../validators/object/validateRequiredKeys'
import validateObjectValues from '../../validators/object/validateObjectValues'

const defaultFieldValidators = juxt([
  compose(validateWhitelistedKeys, pluckName),
  compose(validateRequiredKeys, listRequiredKeys),
])

const fieldsValidators = (fields = {}, fieldsValidator) =>
  compose(concat(defaultFieldValidators(fields)), compact, of)(fieldsValidator)

const validateObject = curry((fieldName, constraints, o) => {
  const constraintsForFields = defaultTo([], constraints.fields)

  return untilFailureValidator([
    validateIsPlainObject,
    validateObjectKeys(
      fieldsValidators(constraintsForFields, constraints.fieldsValidator)
    ),
    validateObjectValues(buildValidatorsMap(constraintsForFields)),
    applyDefaultsWithConstraints(constraintsForFields),
    transformValuesWithConstraints(constraintsForFields),
    validateFieldsWithValue(constraintsForFields),
    validateFieldsWithChildren(constraintsForFields),
  ])(o)
})
export default validateObject
