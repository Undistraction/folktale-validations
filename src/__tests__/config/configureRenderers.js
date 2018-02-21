import { always } from 'ramda'
import { configureRenderers } from '../../index'
import toPayload from '../../failures/toPayload'
import { message1, value1, key1 } from '../testHelpers/fixtures/generic'
import {
  VALIDATE_IS_ARRAY,
  VALIDATE_IS_OBJECT,
  VALIDATE_IS_BOOLEAN,
} from '../../const/validatorUids'

describe(`configureRenderers()`, () => {
  const expectedIsArrayPayload = toPayload(VALIDATE_IS_ARRAY)

  describe(`with no arguments`, () => {
    it(`applies default helpers and validator messages`, () => {
      const { failureRenderer, argumentsFailureRenderer } = configureRenderers()

      expect(failureRenderer(expectedIsArrayPayload)).toEqual(`Wasn't Array`)
      expect(argumentsFailureRenderer(expectedIsArrayPayload)).toEqual(
        `Wasn't Array`
      )
    })
  })

  describe(`with supplied 'validatorsMessages'`, () => {
    it(`overrides supplied messages whilst leaving others untouched`, () => {
      const validatorMessages = {
        [VALIDATE_IS_OBJECT]: always(message1),
      }

      const { failureRenderer, argumentsFailureRenderer } = configureRenderers({
        validatorMessages,
      })

      const expectedIsObjectPayload = toPayload(VALIDATE_IS_OBJECT)

      // Not overridden
      expect(failureRenderer(expectedIsArrayPayload)).toEqual(`Wasn't Array`)
      expect(argumentsFailureRenderer(expectedIsArrayPayload)).toEqual(
        `Wasn't Array`
      )

      // Overridden
      expect(failureRenderer(expectedIsObjectPayload)).toEqual(message1)
      expect(argumentsFailureRenderer(expectedIsObjectPayload)).toEqual(
        message1
      )
    })
  })

  describe(`with supplied 'helperTest'`, () => {
    it(`overrides supplied helperText whilst leaving others untouched`, () => {
      const helperText = {
        OBJECT: value1,
      }

      const { failureRenderer } = configureRenderers({
        helperText,
      })

      const payload = {
        fields: {
          [key1]: toPayload(VALIDATE_IS_BOOLEAN, value1),
        },
      }

      // 'Object' replaced with 'value1'
      expect(failureRenderer(payload)).toEqualWithCompressedWhitespace(
        `value1 included invalid value(s)
          – Key 'key1': Wasn't Boolean`
      )
    })
  })
})
