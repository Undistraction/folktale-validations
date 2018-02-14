import { stubReturnsFailure, stubReturnsSuccess } from '../testHelpers/sinon'
import { value1, uid1, uid2 } from '../testHelpers/fixtures/generic'
import toPayload from '../../failures/toPayload'
import { decorateValidator } from '../../index'

describe(`decorateValidator`, () => {
  describe(`with failed validation`, () => {
    it(`replaces the uid of the payload`, () => {
      const validator = stubReturnsFailure(toPayload(uid1, value1))
      const decoratedValidator = decorateValidator(uid2, validator)
      const validation = decoratedValidator(value1)
      const expectedPayload = toPayload(uid2, value1)
      expect(validation).toEqualFailureWithValue(expectedPayload)
      expect(validator.calledWith(value1)).toBeTrue()
    })
  })

  describe(`with successful validation`, () => {
    it(`does nothing`, () => {
      const validator = stubReturnsSuccess(value1)
      const decoratedValidator = decorateValidator(uid2, validator)
      const validation = decoratedValidator(value1)
      expect(validation).toEqualSuccessWithValue(value1)
      expect(validator.calledWith(value1)).toBeTrue()
    })
  })
})
