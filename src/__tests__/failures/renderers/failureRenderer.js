import { compose, of, prepend } from 'ramda'
import { list } from 'ramda-adjunct'
import {
  flatFailureMessage,
  nestedFailureMessageWithObject,
  nestedFailureMessageWithArray,
  nestedAndsContainingOrs,
  nestedOrsContainingAnds,
  nestedFailureMessageWithObjectAndNestedAnds,
} from '../../testHelpers/fixtures/rendererFailureMessages'
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
  scopeName1,
} from '../../testHelpers/fixtures/generic'
import { joinWithColon, wrapWithSoftBrackets } from '../../../utils/formatting'
import { invalidFailureStructureErrorMessage } from '../../../errors'
import failureRendererHelpersDefaults from '../../../config/defaults/customise/failureRendererHelpersDefaults'
import failureRenderer from '../../../failures/renderers/failureRenderer'
import { setPropScope } from '../../../utils/failures'

const renderPayload = uid =>
  compose(joinWithColon, prepend(uid), of, wrapWithSoftBrackets, list)

describe(`failureRenderer()`, () => {
  const validatorMessages = {
    [uid1]: renderPayload(value1),
    [uid2]: renderPayload(value2),
    [uid3]: renderPayload(value3),
    [uid4]: renderPayload(value4),
    [uid5]: renderPayload(value5),
    [uid6]: renderPayload(value6),
  }

  const renderer = failureRenderer(
    failureRendererHelpersDefaults(validatorMessages)
  )
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
      expect(result).toEqual(`value1: (1,2)`)
    })
  })

  describe(`with ands and ors`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer({ and: [payload1, payload2] })
      expect(result).toEqual(`value1: (1,2) and value2: (1,2)`)
    })
  })

  describe(`with a flat error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(flatFailureMessage)
      expect(result).toEqualMultiline(`
        Object value1: (1,2) included invalid value(s)
          – a: value2: (1,2)
          – b: value3: (1,2)
          – c: value4: (1,2)`)
    })

    describe(`with a scope`, () => {
      it(`renders the correct error message`, () => {
        const scope = {
          name: scopeName1,
        }

        const failureWithScope = setPropScope(scope, flatFailureMessage)
        const result = renderer(failureWithScope)
        expect(result).toEqualMultiline(`
          scopeName1 value1: (1,2) included invalid value(s)
            – a: value2: (1,2)
            – b: value3: (1,2)
            – c: value4: (1,2)`)
      })
    })
  })

  describe(`with a nested error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(nestedFailureMessageWithObject)
      expect(result).toEqualMultiline(`
        Object included invalid value(s)
          – a: value1: (1,2)
          – b: Object value2: (1,2) included invalid value(s)
            – ba: value3: (1,2)
          – c: value4: (1,2)`)
    })
  })

  describe(`with a nested array of error objects`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(nestedFailureMessageWithArray)
      expect(result).toEqualMultiline(`
        Object included invalid value(s)
          – a: value1: (1,2)
          – b: Array included invalid value(s)
            – [1] Object included invalid value(s)
              – b1a: value2: (1,2)
              – b1b: value3: (1,2)
            – [3] Object value4: (1,2) included invalid value(s)
              – b2a: value5: (1,2)
          – c: value6: (1,2)`)
    })
  })

  describe(`with nested ands > ors`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(nestedAndsContainingOrs)
      expect(result).toEqualMultiline(`
        Object included invalid value(s)
          – a: value1: (1,2) and value2: (1,2) and (value3: (1,2) or value4: (1,2) or (value5: (1,2) and value6: (1,2)))`)
    })
  })

  describe(`with nested ors > ands`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(nestedOrsContainingAnds)
      expect(result).toEqualMultiline(`
        Object included invalid value(s)
          – a: value1: (1,2) or value2: (1,2) or (value3: (1,2) and value4: (1,2) and (value5: (1,2) or value6: (1,2)))`)
    })
  })

  describe(`with a flat error object and nested ands`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(nestedFailureMessageWithObjectAndNestedAnds)
      expect(result).toEqualMultiline(`
        Object included invalid value(s)
          – a: value1: (1,2)
          – b: value2: (1,2) and value3: (1,2)`)
    })
  })
})
