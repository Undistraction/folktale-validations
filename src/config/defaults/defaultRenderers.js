import rendererHelpers from './customise/defaultFailureRendererHelpers'
import validatorMessages from './customise/validatorMessagesDefaults'
import failureRendererDefaults from './customise/failureRendererDefaults'
import configureRenderers from '../../config/configureRenderers'

export default configureRenderers(
  validatorMessages,
  rendererHelpers(failureRendererDefaults)
)
