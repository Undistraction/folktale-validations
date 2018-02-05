import defaultRenderer from '../failures/renderers/defaultRenderer'
import argumentsRenderer from '../failures/renderers/argumentsRenderer'

export default messages => {
  const configuredObjectRenderer = defaultRenderer(messages)
  const configuredArgumentsRenderer = argumentsRenderer(
    defaultRenderer,
    messages
  )
  return {
    defaultRenderer: configuredObjectRenderer,
    argumentsRenderer: configuredArgumentsRenderer,
  }
}
