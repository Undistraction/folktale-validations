import { compose } from 'ramda'
import { validation as Validation } from 'folktale'
import { toConstraintsError } from '../../failures/utils'
import { propValue } from '../../utils/props'
import validateObjectWithConstraints from './validateObjectWithConstraints'
import { alwaysSuccess } from '../utils'

const { Failure } = Validation

export default ownConstraints => constraintsToValidate =>
  validateObjectWithConstraints(
    ownConstraints,
    constraintsToValidate
  ).matchWith({
    Success: alwaysSuccess(constraintsToValidate),
    Failure: compose(Failure, toConstraintsError, propValue),
  })
