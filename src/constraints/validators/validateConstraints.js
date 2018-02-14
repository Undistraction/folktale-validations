import { toConstraintsError } from '../../utils/failures'
import { propValue } from '../../utils/props'
import validateObjectWithConstraints from './validateObjectWithConstraints'
import { alwaysSuccess, composeFailure } from '../../utils/validations'

export default ownConstraints => constraintsToValidate =>
  validateObjectWithConstraints(
    ownConstraints,
    constraintsToValidate
  ).matchWith({
    Success: alwaysSuccess(constraintsToValidate),
    Failure: composeFailure(toConstraintsError, propValue),
  })
