import { assoc, head, of } from 'ramda'
import PAYLOAD_FIELD_NAMES from '../const/payloadFieldNames'
import { composeFailure } from '../utils/validations'

const { UID } = PAYLOAD_FIELD_NAMES

export default (uid, validator) => o =>
  validator(o).orElse(composeFailure(of, assoc(UID, uid), head))
