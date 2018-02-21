import { compose, when } from 'ramda'
import { isObject } from 'ramda-adjunct'
import { setPropScope } from '../../utils/failures'
import FAILURE_SCOPE_FIELD_NAMES from '../../const/failureScopeFieldNames'

const { NAME, KEY } = FAILURE_SCOPE_FIELD_NAMES

const ARGUMENTS_FAILURE_RENDERER_SCOPE = {
  [NAME]: `Arguments`,
  [KEY]: `Arg`,
}

export default defaultRenderer => v =>
  compose(
    defaultRenderer,
    when(isObject, setPropScope(ARGUMENTS_FAILURE_RENDERER_SCOPE))
  )(v)
