import { compose, when } from 'ramda'
import { isObject } from 'ramda-adjunct'
import { setPropName } from '../../utils/failures'

export default (defaultRenderer, rendererHelpers) => v =>
  compose(
    defaultRenderer,
    when(isObject, setPropName(rendererHelpers.invalidArgumentsPrefix()))
  )(v)
