import { validateIsLengthBetween } from '../../../index'
import { IS_LENGTH_BETWEEN } from '../../../const/uids'
import toPayload from '../../../failures/toPayload'

describe(`validateIsLengthBetween()`, () => {
  const value = `xxx`

  describe(`when value is greater than minimum length and less than the maximum length`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const minimumLength = 2
      const maximumLength = 4
      const validator = validateIsLengthBetween(minimumLength, maximumLength)
      const validation = validator(value)

      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`when value is less than minimum length`, () => {
    it(`returns a Validation.Failure with the supplied value`, () => {
      const minimumLength = 4
      const maximumLength = 6
      const payload = toPayload(IS_LENGTH_BETWEEN, value, [
        minimumLength,
        maximumLength,
      ])

      const validator = validateIsLengthBetween(minimumLength, maximumLength)
      const validation = validator(value)

      expect(validation).toEqualFailureWithValue(payload)
    })
  })

  describe(`when value is greater than maximum length`, () => {
    it(`returns a Validation.Failure with the supplied value`, () => {
      const minimumLength = 0
      const maximumLength = 3
      const payload = toPayload(IS_LENGTH_BETWEEN, value, [
        minimumLength,
        maximumLength,
      ])

      const validator = validateIsLengthBetween(minimumLength, maximumLength)
      const validation = validator(value)

      expect(validation).toEqualFailureWithValue(payload)
    })
  })
})
