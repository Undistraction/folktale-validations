import { compose } from 'ramda'
import { propValue } from '../../utils/props'
import validateObjectWithConstraints from './validateObjectWithConstraints'
import {
  composeSuccess,
  composeFailure,
  matchWithSuccessOrFailure,
} from '../../utils/validations'
import { constraintsObjName } from '../../messages'
import failureFieldNames from '../../const/failureScopeFieldNames'
import { setPropScope } from '../../utils/failures'

const { NAME } = failureFieldNames

const constraintsFailureScope = {
  [NAME]: constraintsObjName(),
}

export default ownConstraints =>
  compose(
    matchWithSuccessOrFailure(
      composeSuccess(propValue),
      composeFailure(setPropScope(constraintsFailureScope), propValue)
    ),
    validateObjectWithConstraints(ownConstraints)
  )
