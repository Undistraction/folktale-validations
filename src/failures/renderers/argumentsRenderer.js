import { assoc, compose } from 'ramda'
import { FAILURE_FIELD_NAMES } from '../../const'

const { NAME } = FAILURE_FIELD_NAMES

export default (defaultRenderer, messages) =>
  compose(
    defaultRenderer(messages),
    assoc(NAME, messages.invalidArgumentsPrefix())
  )
