import failureRenderer from '../failures/renderers/failureRenderer'
import argumentsFailureRenderer from '../failures/renderers/argumentsFailureRenderer'
import validatorMessagesDefaults from './defaults/customise/validatorMessagesDefaults'
import failureRendererHelpersDefaults from './defaults/customise/failureRendererHelpersDefaults'
import { mergeWithDefaults } from '../utils/object'

export default ({
  validatorMessages,
  helpers = failureRendererHelpersDefaults,
  helperText,
} = {}) => {
  const mergedValidatorMessages = mergeWithDefaults(
    validatorMessagesDefaults,
    validatorMessages
  )

  const configuredHelpers = helpers(mergedValidatorMessages, helperText)

  const configuredFailureRenderer = failureRenderer(configuredHelpers)
  const configuredArgumentsFailureRenderer = argumentsFailureRenderer(
    configuredFailureRenderer,
    configuredHelpers
  )
  return {
    failureRenderer: configuredFailureRenderer,
    argumentsFailureRenderer: configuredArgumentsFailureRenderer,
  }
}
