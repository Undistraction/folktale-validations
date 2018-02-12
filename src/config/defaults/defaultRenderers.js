import rendererMessages from './defaultRendererMessages'
import validatorMessages from './defaultValidatorMessages'
import configureRenderersWithMessages from '../../config/configureRenderersWithMessages'

export const {
  defaultRenderer,
  argumentsRenderer,
} = configureRenderersWithMessages(rendererMessages, validatorMessages)
