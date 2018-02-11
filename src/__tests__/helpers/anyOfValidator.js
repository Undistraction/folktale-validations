import { anyOfValidator } from '../../index'
import {
  spy,
  stubReturnsSuccess,
  stubReturnsFailure,
} from '../testHelpers/sinon'
import { orMessages } from '../../utils/failures'
import {
  value1,
  payload1,
  payload2,
  payload3,
} from '../testHelpers/fixtures/generic'

describe(`anyOfValidator()`, () => {
  describe(`with a valid value`, () => {
    describe(`with first validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const v1 = stubReturnsSuccess(value1)
        const v2 = spy()
        const v3 = spy()
        const validator = anyOfValidator([v1, v2, v3])
        const validation = validator(value1)
        expect(validation).toEqualSuccessWithValue(value1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.notCalled).toBeTrue()
        expect(v3.notCalled).toBeTrue()
      })
    })
    describe(`with second validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const v1 = stubReturnsFailure(payload1)
        const v2 = stubReturnsSuccess(value1)
        const v3 = spy()
        const validator = anyOfValidator([v1, v2, v3])
        const validation = validator(value1)
        expect(validation).toEqualSuccessWithValue(value1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
        expect(v3.notCalled).toBeTrue()
      })
    })
    describe(`with third validation succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const v1 = stubReturnsFailure(payload1)
        const v2 = stubReturnsFailure(payload2)
        const v3 = stubReturnsSuccess(value1)
        const validator = anyOfValidator([v1, v2, v3])
        const validation = validator(value1)
        expect(validation).toEqualSuccessWithValue(value1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
        expect(v3.calledWith(value1)).toBeTrue()
      })
    })
  })
  describe(`with an invalid value`, () => {
    it(`returns a Validation.Failure`, () => {
      const v1 = stubReturnsFailure(payload1)
      const v2 = stubReturnsFailure(payload2)
      const v3 = stubReturnsFailure(payload3)
      const validator = anyOfValidator([v1, v2, v3])
      const validation = validator(value1)
      expect(validation).toEqualFailureWithValue(
        orMessages([payload1, payload2, payload3])
      )
      expect(v1.calledWith(value1)).toBeTrue()
      expect(v2.calledWith(value1)).toBeTrue()
      expect(v3.calledWith(value1)).toBeTrue()
    })
  })
})
