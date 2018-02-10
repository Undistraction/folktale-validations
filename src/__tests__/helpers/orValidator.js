import { orValidator } from '../../index'
import {
  stubReturnsSuccess,
  spy,
  stubReturnsFailure,
} from '../testHelpers/sinon'
import { orMessages } from '../../utils/failures'
import {
  value1,
  payload1,
  payload2,
} from '../testHelpers/fixtures/constraintValues'

describe(`orValidator()`, () => {
  describe(`with a valid value1`, () => {
    describe(`with first validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const v1 = stubReturnsSuccess(value1)
        const v2 = spy()
        const validator = orValidator(v1, v2)
        const validation = validator(value1)
        expect(validation).toEqualSuccessWithValue(value1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.notCalled).toBeTrue()
      })
    })
    describe(`with second validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const v1 = stubReturnsFailure(payload1)
        const v2 = stubReturnsSuccess(value1)
        const validator = orValidator(v1, v2)
        const validation = validator(value1)
        expect(validation).toEqualSuccessWithValue(value1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
      })
    })
  })
  describe(`with an invalid value1`, () => {
    it(`returns a Validation.Failure`, () => {
      const v1 = stubReturnsFailure(payload1)
      const v2 = stubReturnsFailure(payload2)
      const validator = orValidator(v1, v2)
      const validation = validator(value1)
      expect(validation).toEqualFailureWithValue(
        orMessages([payload1, payload2])
      )

      expect(v1.calledWith(value1)).toBeTrue()
      expect(v2.calledWith(value1)).toBeTrue()
    })
  })
})
