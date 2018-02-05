import { flatFailureMessage } from '../../testHelpers/fixtures/rendererFailureMessages'
import argumentsRenderer from '../../../failures/renderers/argumentsRenderer'
import defaultRenderer from '../../../failures/renderers/defaultRenderer'
import defaultRendererMessages from '../../../config/defaults/defaultRendererMessages'

describe(`arguments renderer`, () => {
  const renderer = argumentsRenderer(defaultRenderer, defaultRendererMessages)

  describe(`with a flat error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(flatFailureMessage)
      expect(result).toEqualWithCompressedWhitespace(
        `Arguments
          – fieldsMessageForRoot
          – included invalid value(s)
            – Key 'a': errorMessageForA
            – Key 'b': errorMessageForB
            – Key 'c': errorMessageForC`
      )
    })
  })
})
