import { compose } from 'ramda'
import { setPropName } from '../../utils/failures'
import { propValue } from '../../utils/props'
import validateObjectWithConstraints from './validateObjectWithConstraints'
import {
  composeSuccess,
  composeFailure,
  matchWithSuccessOrFailure,
} from '../../utils/validations'
import { constraintsObjName } from '../../messages'

export default ownConstraints =>
  compose(
    matchWithSuccessOrFailure(
      composeSuccess(propValue),
      composeFailure(setPropName(constraintsObjName()), propValue)
    ),
    validateObjectWithConstraints(ownConstraints)
  )
