import { value1 } from '../testHelpers/fixtures/constraintValues'
import addMessage from '../../helpers/addMessage'
import { stubReturnsSuccess, stubReturnsFailure } from '../testHelpers/sinon'
import toPayload from '../../failures/toPayload'

describe(`addMessage`, () => {
  describe(`with a successful validation`, () => {
    it(`returns a Success untouched`, () => {
      const uid = `uid`
      const validator = stubReturnsSuccess(value1)
      const wrappedValidator = addMessage(uid, validator)
      const validation = wrappedValidator(value1)

      expect(validation).toEqualSuccessWithValue(value1)
    })
  })

  describe(`with a failed validation`, () => {
    it(`returns a Failure with the UID of the failure payload replaced`, () => {
      const uid1 = `uid1`
      const uid2 = `uid2`
      const args = [1, 2]
      const validator = stubReturnsFailure(toPayload(uid1, value1, args))
      const wrappedValidator = addMessage(uid2, validator)
      const validation = wrappedValidator(value1)

      expect(validation).toEqualFailureWithValue([
        toPayload(uid2, value1, args),
      ])
    })
  })
})
