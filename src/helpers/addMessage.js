import { compose, assoc, head, of } from 'ramda'
import { validation as Validation } from 'folktale'
import PAYLOAD_FIELD_NAMES from '../const/payloadFieldNames'

const { Failure } = Validation
const { UID } = PAYLOAD_FIELD_NAMES

export default (uid, validator) => o =>
  validator(o).orElse(compose(Failure, of, assoc(UID, uid), head))
