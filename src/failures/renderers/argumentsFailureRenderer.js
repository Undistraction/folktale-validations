import { assoc, compose } from 'ramda'
import FAILURE_FIELD_NAMES from '../../const/failureFieldNames'

const { NAME } = FAILURE_FIELD_NAMES

export default (defaultRenderer, messages) => v =>
  compose(defaultRenderer, assoc(NAME, messages.invalidArgumentsPrefix()))(v)
