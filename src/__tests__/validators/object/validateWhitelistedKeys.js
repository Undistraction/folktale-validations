import { validateWhitelistedKeys } from '../../../index'
import { key1, key2, key3, key4 } from '../../testHelpers/fixtures/generic'
import toPayload from '../../../failures/toPayload'
import { VALIDATE_WHITELISTED_KEYS } from '../../../const/validatorUids'

describe(`validateWhitelistedKeys()`, () => {
  const whitelistedKeys = [key1, key2, key3]
  let validateWhitelistedKeysWithKeys

  beforeEach(() => {
    validateWhitelistedKeysWithKeys = validateWhitelistedKeys(whitelistedKeys)
  })

  describe(`when object has only valid keys`, () => {
    it(`returns a Validation.Success with a value of the object`, () => {
      const value = {
        [key1]: 1,
        [key2]: 2,
        [key3]: 3,
      }

      const validation = validateWhitelistedKeysWithKeys(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`when object has only invalid keys`, () => {
    it(`returns a Validation.Failure with a payload`, () => {
      const value = {
        [key1]: 1,
        [key2]: 2,
        [key3]: 3,
        [key4]: 4,
      }
      const invalidKeys = [key4]
      const expectedPayload = toPayload(VALIDATE_WHITELISTED_KEYS, value, [
        whitelistedKeys,
        invalidKeys,
      ])
      const validation = validateWhitelistedKeysWithKeys(value)
      expect(validation).toEqualFailureWithValue(expectedPayload)
    })
  })

  describe(`when object has no keys`, () => {
    it(`returns a Validation.Success with a value of the object`, () => {
      const value = {}
      const validation = validateWhitelistedKeysWithKeys(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })
})
