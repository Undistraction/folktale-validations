import { when, dissoc, has, compose, curry, assoc } from 'ramda'
import PAYLOAD_FIELD_NAMES from '../const/payloadFieldNames'
import { successOrElse } from '../utils/validations'

const { UID } = PAYLOAD_FIELD_NAMES

const replace = (uid, value) =>
  compose(
    assoc(UID, uid),
    assoc(`value`, value),
    when(has(`and`), dissoc(`and`)),
    when(has(`or`), dissoc(`or`))
  )

export default curry((uid, validator) => value =>
  compose(successOrElse(replace(uid, value)), validator)(value)
)
