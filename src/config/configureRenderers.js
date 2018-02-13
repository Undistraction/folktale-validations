import defaultRenderer from '../failures/renderers/failureRenderer'
import argumentsRenderer from '../failures/renderers/argumentsFailureRenderer'
import validatorMessagesDefaults from './defaults/customise/validatorMessagesDefaults'
import defaultFailureRendererHelpers from './defaults/customise/defaultFailureRendererHelpers'

export default (
  validatorMessages = validatorMessagesDefaults,
  rendererHelpers = defaultFailureRendererHelpers
) => {
  const configuredFailureRenderer = defaultRenderer(
    rendererHelpers,
    validatorMessages
  )
  const configuredArgumentsRenderer = argumentsRenderer(
    defaultRenderer,
    rendererHelpers
  )
  return {
    defaultRenderer: configuredFailureRenderer,
    argumentsRenderer: configuredArgumentsRenderer,
  }
}
