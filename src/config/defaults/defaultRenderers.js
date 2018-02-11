import rendererMessages from './defaultRendererMessages'
import validatorMessages from './defaultValidatorMessages'
import configureRenderersWithMessages from '../../config/configureRenderersWithMessages'

export default configureRenderersWithMessages(
  rendererMessages,
  validatorMessages
)
