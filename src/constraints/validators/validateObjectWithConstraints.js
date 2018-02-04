import { identity, curry, always, propEq } from 'ramda'
import {
  ROOT_FIELD,
  CONSTRAINT_FIELD_NAMES,
  OWN_CONSTRAINTS,
} from '../../const'
import validateObject from './validateObject'
import validateConstraints from './validateConstraints'
import CONSTRAINTS from '../constraints'

const constraintsAreOwnConstraints = propEq(
  CONSTRAINT_FIELD_NAMES.ID,
  OWN_CONSTRAINTS
)

const validateObjectWithConstraints = validators => {
  const configuredConstraints = CONSTRAINTS(validators)
  const configuredValidateObject = validateObject(validators)
  return curry(
    (constraints, o) =>
      constraintsAreOwnConstraints(constraints)
        ? configuredValidateObject(ROOT_FIELD, constraints, o)
        : validateConstraints(
            configuredConstraints,
            validateObjectWithConstraints(validators)
          )(constraints).matchWith({
            Success: always(
              configuredValidateObject(ROOT_FIELD, constraints, o)
            ),
            Failure: identity,
          })
  )
}

export default validateObjectWithConstraints
