import { compose, ifElse, identity, curry, propEq, __ } from 'ramda'
import { ROOT_FIELD, OWN_CONSTRAINTS } from '../const'
import CONSTRAINT_FIELD_NAMES from '../../const/constraintFieldNames'
import validateObject from './validateObject'
import validateConstraints from './validateConstraints'
import CONSTRAINTS from '../constraints'
import { matchWithSuccessOrFailure, propValue } from '../../utils/validations'

const constraintsAreOwnConstraints = propEq(
  CONSTRAINT_FIELD_NAMES.ID,
  OWN_CONSTRAINTS
)

const validateObjectWithConstraints = curry((constraints, o) =>
  ifElse(
    constraintsAreOwnConstraints,
    validateObject(ROOT_FIELD, __, o),
    compose(
      matchWithSuccessOrFailure(
        compose(validateObject(ROOT_FIELD, __, o), propValue),
        identity
      ),
      validateConstraints(CONSTRAINTS)
    )
  )(constraints)
)

export default validateObjectWithConstraints
