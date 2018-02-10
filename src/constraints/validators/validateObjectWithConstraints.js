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

const validateObjectWithConstraints = curry(
  (constraints, o) =>
    constraintsAreOwnConstraints(constraints)
      ? validateObject(ROOT_FIELD, constraints, o)
      : validateConstraints(CONSTRAINTS)(constraints).matchWith({
          Success: always(validateObject(ROOT_FIELD, constraints, o)),
          Failure: identity,
        })
)

export default validateObjectWithConstraints
