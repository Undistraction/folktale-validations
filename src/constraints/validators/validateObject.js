import { always, when, append, curry, compose, juxt, defaultTo } from 'ramda'
import { isNotUndefined } from 'ramda-adjunct'
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

const configureDefaultFieldValidators = juxt([
  compose(validateWhitelistedKeys, pluckName),
  compose(validateRequiredKeys, listRequiredKeys),
])

const fieldsValidators = fieldsValidator => fields =>
  when(always(isNotUndefined(fieldsValidator)), append(fieldsValidator))(
    configureDefaultFieldValidators(fields)
  )

const validationSteps = constraints =>
  compose(
    juxt([
      compose(
        validateObjectKeys,
        fieldsValidators(constraints.fieldsValidator)
      ),
      compose(validateObjectValues, buildValidatorsMap),
      applyDefaultsWithConstraints,
      transformValuesWithConstraints,
      validateFieldsWithValue,
      validateFieldsWithChildren,
    ]),
    defaultTo([]),
    propFields
  )(constraints)

const validateObject = curry((fieldName, constraints, o) =>
  untilFailureValidator([
    validateIsPlainObject,
    ...validationSteps(constraints),
  ])(o)
)
export default validateObject
