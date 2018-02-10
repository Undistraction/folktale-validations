import { validateRequiredKeys } from '../../../index'
import { key1, key2, key3 } from '../../testHelpers/fixtures/constraintValues'
import toPayload from '../../../failures/toPayload'
import { REQUIRED_KEYS } from '../../../const/uids'

describe(`validate required keys`, () => {
  const requiredKeys = [key1, key2, key3]
  describe(`with missing keys`, () => {
    it(`returns a Success.Failure with message`, () => {
      const value = {}
      const missingKeys = [key1, key2, key3]
      const expectedPayload = toPayload(REQUIRED_KEYS, value, [
        requiredKeys,
        missingKeys,
      ])

      const validator = validateRequiredKeys(requiredKeys)
      const result = validator(value)
      expect(result).toEqualFailureWithValue(expectedPayload)
    })
  })

  describe(`with no missing keys`, () => {
    it(`returns a Success.Failure with message`, () => {
      const value = {
        [key1]: 1,
        [key2]: 2,
        [key3]: 3,
      }
      const validator = validateRequiredKeys(requiredKeys)
      const result = validator(value)
      expect(result).toEqualSuccessWithValue(value)
    })
  })
})
