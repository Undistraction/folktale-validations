import { compose, curry, assoc } from 'ramda'
import PAYLOAD_FIELD_NAMES from '../const/payloadFieldNames'
import { successOrElse } from '../utils/validations'

const { UID } = PAYLOAD_FIELD_NAMES

export default curry((uid, validator) =>
  compose(successOrElse(assoc(UID, uid)), validator)
)
