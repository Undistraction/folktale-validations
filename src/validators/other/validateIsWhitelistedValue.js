import { ifElse, contains, __ } from 'ramda'
import { validation as Validation } from 'folktale'
import { VALIDATE_IS_WHITELISTED_VALUE } from '../../const/validatorUids'
import { alwaysFailureWithPayload } from '../../utils/validations'

const { Success } = Validation

export default whitelist => o =>
  ifElse(
    contains(__, whitelist),
    Success,
    alwaysFailureWithPayload(VALIDATE_IS_WHITELISTED_VALUE, o, [whitelist])
  )(o)
