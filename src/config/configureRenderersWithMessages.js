import defaultRenderer from '../failures/renderers/failureRenderer'
import argumentsRenderer from '../failures/renderers/argumentsFailureRenderer'

export default (rendererMessages, validatorMessages) => {
  const configuredObjectRenderer = defaultRenderer(
    rendererMessages,
    validatorMessages
  )
  const configuredArgumentsRenderer = argumentsRenderer(
    defaultRenderer,
    rendererMessages
  )
  return {
    defaultRenderer: configuredObjectRenderer,
    argumentsRenderer: configuredArgumentsRenderer,
  }
}
