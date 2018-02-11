import defaultRenderer from '../failures/renderers/defaultRenderer'
import argumentsRenderer from '../failures/renderers/argumentsRenderer'

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
