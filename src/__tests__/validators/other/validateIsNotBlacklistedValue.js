import { validateIsNotBlacklistedValue } from '../../../index'
import toPayload from '../../../failures/toPayload'
import { IS_NOT_BLACKLISTED_VALUE } from '../../../const/uids'
import {
  value1,
  value2,
  value3,
  value4,
} from '../../testHelpers/fixtures/constraintValues'

describe(`validateIsNotBlacklistedValue()`, () => {
  const blacklist = [value1, value2, value3]
  const validator = validateIsNotBlacklistedValue(blacklist)

  describe(`when value is not in the blacklist`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const validation = validator(value4)
      expect(validation).toEqualSuccessWithValue(value4)
    })
  })

  describe(`when no value is passed`, () => {
    it(`returns a Validation.Success with value`, () => {
      const validation = validator()
      expect(validation).toEqualSuccessWithValue()
    })
  })

  describe(`when value is on the blacklist`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const expectedPayload = toPayload(IS_NOT_BLACKLISTED_VALUE, value2, [
        blacklist,
      ])
      const validation = validator(value2)
      expect(validation).toEqualFailureWithValue(expectedPayload)
    })

    describe(`when value is first item`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const expectedPayload = toPayload(IS_NOT_BLACKLISTED_VALUE, value1, [
          blacklist,
        ])
        const validation = validator(value1)
        expect(validation).toEqualFailureWithValue(expectedPayload)
      })
    })

    describe(`when value is last item`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const expectedPayload = toPayload(IS_NOT_BLACKLISTED_VALUE, value3, [
          blacklist,
        ])
        const validation = validator(value3)
        expect(validation).toEqualFailureWithValue(expectedPayload)
      })
    })
  })
})
