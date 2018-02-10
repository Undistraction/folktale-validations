import { validateIsLengthLessThan } from '../../../index'
import toPayload from '../../../failures/toPayload'
import { IS_LENGTH_LESS_THAN } from '../../../const/uids'

describe(`validateIsLengthLessThan()`, () => {
  const value = `abc`
  describe(`when value is less than maximum length`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const length = 4
      const validator = validateIsLengthLessThan(length)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`when value is equal to maximum length`, () => {
    it(`returns a Validation.Failure with payload`, () => {
      const length = 3
      const validator = validateIsLengthLessThan(length)
      const payload = toPayload(IS_LENGTH_LESS_THAN, value, [length])
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue(payload)
    })
  })

  describe(`when value is less than maximum length`, () => {
    it(`returns a Validation.Failure with payload`, () => {
      const length = 2
      const payload = toPayload(IS_LENGTH_LESS_THAN, value, [length])
      const validator = validateIsLengthLessThan(length)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue(payload)
    })
  })
})
