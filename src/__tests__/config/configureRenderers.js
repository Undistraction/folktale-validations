import { always } from 'ramda'
import { configureRenderers } from '../../index'
import toPayload from '../../failures/toPayload'
import { message1 } from '../testHelpers/fixtures/generic'
import {
  VALIDATE_IS_ARRAY,
  VALIDATE_IS_OBJECT,
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
})
