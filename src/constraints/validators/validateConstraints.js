import { always, compose } from 'ramda'
import { validation as Validation } from 'folktale'
import { toConstraintsError } from '../../failures/utils'
import { propValue } from '../../utils/props'
import validateObjectWithConstraints from './validateObjectWithConstraints'

const { Failure, Success } = Validation

export default ownConstraints => constraintsToValidate =>
  validateObjectWithConstraints(
    ownConstraints,
    constraintsToValidate
  ).matchWith({
    Success: always(Success(constraintsToValidate)),
    Failure: compose(Failure, toConstraintsError, propValue),
  })
