import validateExclusiveKeys from '../../../validators/object/validateExclusiveKeys'
import { key1, key2, key3, key4 } from '../../testHelpers/fixtures/generic'
import toPayload from '../../../failures/toPayload'
import { EXCLUSIVE_KEYS } from '../../../const/validatorUids'

describe(`validateExclusiveKeys`, () => {
  const value = {
    [key1]: 1,
    [key2]: 2,
    [key3]: 3,
  }

  describe(`with no exclusive keys defined`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const exclusiveKeys = []
      const validator = validateExclusiveKeys(exclusiveKeys)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`with no exclusive keys present`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const exclusiveKeys = [`d`]
      const validator = validateExclusiveKeys(exclusiveKeys)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`with one exclusive key defined and present`, () => {
    it(`returns a Validation.Failure with payload`, () => {
      const exclusiveKeys = [key1]
      const validator = validateExclusiveKeys(exclusiveKeys)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`with two exclusive key defined and present`, () => {
    it(`returns a Validation.Failure with payload`, () => {
      const exclusiveKeys = [key1, key2]
      const presentExclusiveKeys = [key1, key2]
      const expectedPayload = toPayload(EXCLUSIVE_KEYS, value, [
        exclusiveKeys,
        presentExclusiveKeys,
      ])
      const validator = validateExclusiveKeys(exclusiveKeys)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue(expectedPayload)
    })
  })

  describe(`with multiple exclusive key defined and some present`, () => {
    it(`returns a Validation.Failure with payload`, () => {
      const exclusiveKeys = [key1, key2, key3, key4]
      const presentExclusiveKeys = [key1, key2, key3]
      const expectedPayload = toPayload(EXCLUSIVE_KEYS, value, [
        exclusiveKeys,
        presentExclusiveKeys,
      ])

      const validator = validateExclusiveKeys(exclusiveKeys)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue(expectedPayload)
    })
  })
})
