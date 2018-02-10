import { untilFailureValidator } from '../../index'
import {
  stubReturnsSuccess,
  stubReturnsFailure,
  spy,
} from '../testHelpers/sinon'
import { value1, payload1 } from '../testHelpers/fixtures/constraintValues'

describe(`untilFailureValidator()`, () => {
  describe(`with valid value`, () => {
    it(`returns a Validation.Success with value`, () => {
      const v1 = stubReturnsSuccess(value1)
      const v2 = stubReturnsSuccess(value1)
      const v3 = stubReturnsSuccess(value1)
      const validator = untilFailureValidator([v1, v2, v3])
      const result = validator(value1)
      expect(result).toEqualSuccessWithValue(value1)
      expect(v1.calledWith(value1)).toBeTrue()
      expect(v2.calledWith(value1)).toBeTrue()
      expect(v3.calledWith(value1)).toBeTrue()
    })
  })

  describe(`with invalid value`, () => {
    describe(`with first validator failing`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        const v1 = stubReturnsFailure(payload1)
        const v2 = spy()
        const v3 = spy()
        const validator = untilFailureValidator([v1, v2, v3])
        const result = validator(value1)
        expect(result).toEqualFailureWithValue(payload1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.notCalled).toBeTrue()
        expect(v3.notCalled).toBeTrue()
      })
    })

    describe(`with second validator failing`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        const v1 = stubReturnsSuccess(value1)
        const v2 = stubReturnsFailure(payload1)
        const v3 = spy()
        const validator = untilFailureValidator([v1, v2, v3])
        const result = validator(value1)
        expect(result).toEqualFailureWithValue(payload1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
        expect(v3.notCalled).toBeTrue()
      })
    })

    describe(`with third validator failing`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        const v1 = stubReturnsSuccess(value1)
        const v2 = stubReturnsSuccess(value1)
        const v3 = stubReturnsFailure(payload1)
        const validator = untilFailureValidator([v1, v2, v3])
        const result = validator(value1)
        expect(result).toEqualFailureWithValue(payload1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
        expect(v3.calledWith(value1)).toBeTrue()
      })
    })
  })
})
