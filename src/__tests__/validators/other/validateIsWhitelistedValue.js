import { validateIsWhitelistedValue } from '../../../index'
import toPayload from '../../../failures/toPayload'
import { IS_WHITELISTED_VALUE } from '../../../const/uids'
import {
  value2,
  value1,
  value3,
  value4,
} from '../../testHelpers/fixtures/constraintValues'

describe(`validateIsWhitelistedValue()`, () => {
  const whitelist = [value1, value2, value3]
  const validator = validateIsWhitelistedValue(whitelist)

  describe(`when value is in the whitelist`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const validation = validator(value2)
      expect(validation).toEqualSuccessWithValue(value2)
    })

    describe(`when value is first item`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const validation = validator(value1)
        expect(validation).toEqualSuccessWithValue(value1)
      })
    })

    describe(`when value is last item`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const validation = validator(value3)
        expect(validation).toEqualSuccessWithValue(value3)
      })
    })
  })

  describe(`when value is not on the whitelist`, () => {
    describe(`when no value is passed`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const expectedPayload = toPayload(IS_WHITELISTED_VALUE, undefined, [
          whitelist,
        ])
        const validation = validator()
        expect(validation).toEqualFailureWithValue(expectedPayload)
      })
    })

    describe(`when value isn't on the whitelist`, () => {
      it(`returns a Validation.Failure with an error message`, () => {
        const expectedPayload = toPayload(IS_WHITELISTED_VALUE, value4, [
          whitelist,
        ])
        const validation = validator(value4)
        expect(validation).toEqualFailureWithValue(expectedPayload)
      })
    })
  })
})
