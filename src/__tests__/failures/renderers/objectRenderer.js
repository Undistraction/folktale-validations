import { assoc } from 'ramda'
import objectRenderer from '../../../failures/renderers/objectRenderer'
import {
  flatFailureMessage,
  nestedFailureMessageWithObject,
  nestedFailureMessageWithArray,
} from '../../testHelpers/fixtures/failureMessages'

describe(`objectRenderer()`, () => {
  const rootName = `Root Name`

  describe(`with a single error string`, () => {
    it(`renders the correct error message`, () => {
      const result = objectRenderer(`errorMessage`)
      expect(result).toEqualWithCompressedWhitespace(`errorMessage`)
    })

    describe(`with rootName`, () => {
      it(`renders the correct error message`, () => {
        const result = objectRenderer(`errorMessage`, rootName)
        expect(result).toEqualWithCompressedWhitespace(`errorMessage`)
      })
    })
  })

  describe(`with an array of error strings`, () => {
    it(`renders the correct error message`, () => {
      const result = objectRenderer([`errorMessage1`, `errorMessage2`])
      expect(result).toEqualWithCompressedWhitespace(
        `errorMessage1 and errorMessage2`
      )
    })
  })

  describe(`with a flat error object`, () => {
    it(`renders the correct error message`, () => {
      const result = objectRenderer(flatFailureMessage)
      expect(result).toEqualWithCompressedWhitespace(
        `Object 
          – fieldsMessageForRoot
          – included invalid value(s)
            – Key 'a': errorMessageForA
            – Key 'b': errorMessageForB
            – Key 'c': errorMessageForC`
      )
    })

    describe(`with a name`, () => {
      it(`renders the correct error message`, () => {
        const name = `Object Name`
        const result = objectRenderer(assoc(`name`, name, flatFailureMessage))
        expect(result).toEqualWithCompressedWhitespace(
          `Object Name 
            – fieldsMessageForRoot
            – included invalid value(s)
              – Key 'a': errorMessageForA
              – Key 'b': errorMessageForB
              – Key 'c': errorMessageForC`
        )
      })
    })
  })

  describe(`with a nested error object`, () => {
    it(`renders the correct error message`, () => {
      const result = objectRenderer(nestedFailureMessageWithObject)
      expect(result).toEqualWithCompressedWhitespace(
        `Object 
          – included invalid value(s)
            – Key 'a': errorMessageForA
            – Key 'b': Object 
              – fieldsMessageForB
              – included invalid value(s)
                –  Key 'ba': errorMessageForBA
            – Key 'c': errorMessageForC`
      )
    })
  })

  describe(`with a nested array of error objects`, () => {
    it(`renders the correct error message`, () => {
      const result = objectRenderer(nestedFailureMessageWithArray)
      expect(result).toEqualWithCompressedWhitespace(
        `Object 
          – included invalid value(s)
            – Key 'a': errorMessageForA
            – Key 'b': Array included invalid object(s)
              – [0] Object 
                – included invalid value(s)
                  – Key 'b1a': errorMessageForB1A
                  – Key 'b1b': errorMessageForB1A
              – [1] Object 
                – fieldsMessageForB2
                – included invalid value(s)
                  – Key 'b2a': errorMessageForB2B
            – Key 'c': errorMessageForC`
      )
    })
  })
})
