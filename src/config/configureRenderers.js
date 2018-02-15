import failureRenderer from '../failures/renderers/failureRenderer'
import argumentsFailureRenderer from '../failures/renderers/argumentsFailureRenderer'
import validatorMessagesDefaults from './defaults/customise/validatorMessagesDefaults'
import defaultFailureRendererHelpers from './defaults/customise/defaultFailureRendererHelpers'

export default (
  validatorMessages = validatorMessagesDefaults,
  rendererHelpers = defaultFailureRendererHelpers
) => {
  const configuredFailureRenderer = failureRenderer(
    rendererHelpers,
    validatorMessages
  )
  const configuredArgumentsFailureRenderer = argumentsFailureRenderer(
    failureRenderer,
    rendererHelpers
  )
  return {
    failureRenderer: configuredFailureRenderer,
    argumentsFailureRenderer: configuredArgumentsFailureRenderer,
  }
}
