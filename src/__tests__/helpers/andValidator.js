import { andValidator } from '../../index'
import { stubReturnsSuccess, stubReturnsFailure } from '../testHelpers/sinon'
import { andMessages } from '../../utils/failures'
import { value1, payload1, payload2 } from '../testHelpers/fixtures/generic'

describe(`andValidator()`, () => {
  describe(`with a valid value`, () => {
    it(`returns a Validation.Success`, () => {
      const v1 = stubReturnsSuccess(value1)
      const v2 = stubReturnsSuccess(value1)
      const validator = andValidator(v1, v2)
      const validation = validator(value1)
      expect(validation).toEqualSuccessWithValue(value1)
      expect(v1.calledWith(value1)).toBeTrue()
      expect(v1.calledWith(value1)).toBeTrue()
    })
  })
  describe(`with an invalid value`, () => {
    describe(`with first validations failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const v1 = stubReturnsFailure(payload1)
        const v2 = stubReturnsSuccess(value1)
        const validator = andValidator(v1, v2)
        const validation = validator(value1)
        expect(validation).toEqualFailureWithValue(payload1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
      })
    })
  })

  describe(`with second validations failing`, () => {
    it(`returns a Validation.Failure`, () => {
      const v1 = stubReturnsSuccess(value1)
      const v2 = stubReturnsFailure(payload2)
      const validator = andValidator(v1, v2)
      const validation = validator(value1)
      expect(validation).toEqualFailureWithValue(payload2)
      expect(v1.calledWith(value1)).toBeTrue()
      expect(v2.calledWith(value1)).toBeTrue()
    })
  })

  describe(`with both validations failing`, () => {
    it(`returns a Validation.Failure`, () => {
      const v1 = stubReturnsFailure(payload1)
      const v2 = stubReturnsFailure(payload2)
      const validator = andValidator(v1, v2)
      const validation = validator(value1)
      expect(validation).toEqualFailureWithValue(
        andMessages([payload1, payload2])
      )
      expect(v1.calledWith(value1)).toBeTrue()
      expect(v2.calledWith(value1)).toBeTrue()
    })
  })
})
