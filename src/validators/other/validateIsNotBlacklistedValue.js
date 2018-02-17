import { ifElse, contains, __ } from 'ramda'
import { validation as Validation } from 'folktale'
import { VALIDATE_IS_NOT_BLACKLISTED_VALUE } from '../../const/validatorUids'
import { alwaysFailureWithPayload } from '../../utils/validations'

const { Success } = Validation

export default blacklist => o =>
  ifElse(
    contains(__, blacklist),
    alwaysFailureWithPayload(VALIDATE_IS_NOT_BLACKLISTED_VALUE, o, [blacklist]),
    Success
  )(o)
