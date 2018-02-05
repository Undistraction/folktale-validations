import { assoc, compose } from 'ramda'
import { FAILURE_FIELD_NAMES } from '../../const'

const { NAME } = FAILURE_FIELD_NAMES

export default (objectRenderer, messages) =>
  compose(
    objectRenderer(messages),
    assoc(NAME, messages.invalidArgumentsPrefix())
  )
