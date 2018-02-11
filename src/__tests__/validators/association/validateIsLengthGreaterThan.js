import { validateIsLengthGreaterThan } from '../../../index'
import toPayload from '../../../failures/toPayload'
import { IS_LENGTH_GREATER_THAN } from '../../../const/validatorUids'

describe(`validateIsLengthGreaterThan()`, () => {
  const value = `abc`

  describe(`when value is greater than minimum length`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const length = 2
      const validator = validateIsLengthGreaterThan(length)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`when value is equal to minimum length`, () => {
    it(`returns a Validation.Failure with the supplied message`, () => {
      const length = 3
      const payload = toPayload(IS_LENGTH_GREATER_THAN, value, [length])
      const validator = validateIsLengthGreaterThan(length)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue(payload)
    })
  })

  describe(`when value is less than minimum length`, () => {
    it(`returns a Validation.Failure with the supplied message`, () => {
      const length = 4
      const payload = toPayload(IS_LENGTH_GREATER_THAN, value, [length])
      const validator = validateIsLengthGreaterThan(length)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue(payload)
    })
  })
})
