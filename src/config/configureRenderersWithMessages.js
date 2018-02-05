import objectRenderer from '../failures/renderers/objectRenderer'
import argumentsRenderer from '../failures/renderers/argumentsRenderer'

export default messages => {
  const configuredObjectRenderer = objectRenderer(messages)
  const configuredArgumentsRenderer = argumentsRenderer(
    objectRenderer,
    messages
  )
  return {
    objectRenderer: configuredObjectRenderer,
    argumentsRenderer: configuredArgumentsRenderer,
  }
}
