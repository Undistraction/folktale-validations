import { compose, assoc, of, prepend } from 'ramda'
import { list } from 'ramda-adjunct'
import defaultRenderer from '../../../failures/renderers/defaultRenderer'
import {
  flatFailureMessage,
  nestedFailureMessageWithObject,
  nestedFailureMessageWithArray,
} from '../../testHelpers/fixtures/rendererFailureMessages'
import defaultRendererMessages from '../../../config/defaults/defaultRendererMessages'
import {
  uid1,
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  uid2,
  uid3,
  uid4,
  uid5,
  uid6,
  payload1,
  payload2,
} from '../../testHelpers/fixtures/generic'
import { joinWithColon, wrapWithSoftBrackets } from '../../../utils/formatting'
import { invalidFailureStructureErrorMessage } from '../../../errors'

const renderPayload = uid =>
  compose(joinWithColon, prepend(uid), of, wrapWithSoftBrackets, list)

describe(`defaultRenderer()`, () => {
  const validatorMessages = {
    [uid1]: renderPayload(value1),
    [uid2]: renderPayload(value2),
    [uid3]: renderPayload(value3),
    [uid4]: renderPayload(value4),
    [uid5]: renderPayload(value5),
    [uid6]: renderPayload(value6),
  }

  const renderer = defaultRenderer(defaultRendererMessages, validatorMessages)

  describe(`with an invalid payload`, () => {
    it(`throws`, () => {
      const value = []
      expect(() => renderer(value)).toThrow(
        invalidFailureStructureErrorMessage(value)
      )
    })
  })

  describe(`with a single payload`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(payload1)
      expect(result).toEqualWithCompressedWhitespace(`value1: (1,2)`)
    })
  })

  describe(`with ands and ors`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer({ and: [payload1, payload2] })
      expect(result).toEqualWithCompressedWhitespace(
        `value1: (1,2) and value2: (1,2)`
      )
    })
  })

  describe(`with a flat error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(flatFailureMessage)
      expect(result).toEqualWithCompressedWhitespace(
        `Object 
          – value1: (1,2)
          – included invalid value(s)
            – Key 'a': value2: (1,2)
            – Key 'b': value3: (1,2)
            – Key 'c': value4: (1,2)`
      )
    })

    describe(`with a name`, () => {
      it(`renders the correct error message`, () => {
        const name = `Object Name`
        const result = renderer(assoc(`name`, name, flatFailureMessage))
        expect(result).toEqualWithCompressedWhitespace(
          `Object Name 
            – value1: (1,2)
            – included invalid value(s)
              – Key 'a': value2: (1,2)
              – Key 'b': value3: (1,2)
              – Key 'c': value4: (1,2)`
        )
      })
    })
  })

  describe(`with a nested error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(nestedFailureMessageWithObject)
      expect(result).toEqualWithCompressedWhitespace(
        `Object 
          – included invalid value(s)
            – Key 'a': value1: (1,2)
            – Key 'b':
                Object
                  – value2: (1,2)
                  – included invalid value(s)
                    –  Key 'ba': value3: (1,2)
            – Key 'c': value4: (1,2)`
      )
    })
  })

  describe(`with a nested array of error objects`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(nestedFailureMessageWithArray)
      expect(result).toEqualWithCompressedWhitespace(
        `Object 
          – included invalid value(s)
            – Key 'a': value1: (1,2)
            – Key 'b': Array included invalid value(s)
              – [0] Object 
                – included invalid value(s)
                  – Key 'b1a': value2: (1,2)
                  – Key 'b1b': value3: (1,2)
              – [1] Object 
                – value4: (1,2)
                – included invalid value(s)
                  – Key 'b2a': value5: (1,2)
            – Key 'c': value6: (1,2)`
      )
    })
  })
})
