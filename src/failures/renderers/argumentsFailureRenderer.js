import { compose } from 'ramda'
import { setPropName } from '../../utils/failures'

export default (defaultRenderer, rendererHelpers) => v =>
  compose(
    defaultRenderer,
    setPropName(rendererHelpers.invalidArgumentsPrefix())
  )(v)
