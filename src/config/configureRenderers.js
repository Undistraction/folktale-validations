import failureRenderer from '../failures/renderers/failureRenderer'
import argumentsFailureRenderer from '../failures/renderers/argumentsFailureRenderer'
import validatorMessagesDefaults from './defaults/customise/validatorMessagesDefaults'
import failureRendererHelpersDefaults from './defaults/customise/failureRendererHelpersDefaults'
import { mergeWithDefaults } from '../utils/object'

export default ({ validatorMessages, helpers } = {}) => {
  const mergedValidatorMessages = mergeWithDefaults(
    validatorMessagesDefaults,
    validatorMessages
  )
  const mergedHelpers = mergeWithDefaults(
    failureRendererHelpersDefaults,
    helpers
  )

  const configuredFailureRenderer = failureRenderer(
    mergedHelpers,
    mergedValidatorMessages
  )
  const configuredArgumentsFailureRenderer = argumentsFailureRenderer(
    configuredFailureRenderer,
    mergedHelpers
  )
  return {
    failureRenderer: configuredFailureRenderer,
    argumentsFailureRenderer: configuredArgumentsFailureRenderer,
  }
}
