import rendererHelpers from './customise/defaultFailureRendererHelpers'
import validatorMessagesDefaults from './customise/validatorMessagesDefaults'
import failureRendererDefaults from './customise/failureRendererDefaults'
import configureRenderers from '../../config/configureRenderers'

export default configureRenderers(
  validatorMessagesDefaults,
  rendererHelpers(failureRendererDefaults)
)
