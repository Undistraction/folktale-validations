import { regExpValidator } from '../..'
import { uid1 } from '../testHelpers/fixtures/generic'
import toPayload from '../../failures/toPayload'

describe(`regExpValidator()`, () => {
  describe(`with a valid value`, () => {
    const regExp = /^a[a-zA-Z]+/
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = `alpha`
      const validator = regExpValidator(uid1, regExp)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`with a invalid value`, () => {
    const regExp = /^a[a-zA-Z]+/
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = `bravo`
      const expectedPayload = toPayload(uid1, value)
      const validator = regExpValidator(uid1, regExp)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue(expectedPayload)
    })
  })
})
