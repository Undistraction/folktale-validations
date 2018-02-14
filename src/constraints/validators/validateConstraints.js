import { setPropName } from '../../utils/failures'
import { propValue } from '../../utils/props'
import validateObjectWithConstraints from './validateObjectWithConstraints'
import { alwaysSuccess, composeFailure } from '../../utils/validations'
import { constraintsObjName } from '../../messages'

export default ownConstraints => constraintsToValidate =>
  validateObjectWithConstraints(
    ownConstraints,
    constraintsToValidate
  ).matchWith({
    Success: alwaysSuccess(constraintsToValidate),
    Failure: composeFailure(setPropName(constraintsObjName()), propValue),
  })
