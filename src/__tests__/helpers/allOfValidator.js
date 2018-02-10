import { allOfValidator } from '../../index'
import { stubReturnsSuccess, stubReturnsFailure } from '../testHelpers/sinon'
import { andMessages } from '../../utils/failures'
import {
  value1,
  payload1,
  payload2,
  payload3,
} from '../testHelpers/fixtures/constraintValues'

describe(`allOfValidator()`, () => {
  describe(`with a valid value`, () => {
    describe(`with all validations succeeding`, () => {
      it(`returns a Validation.Success`, () => {
        const v1 = stubReturnsSuccess(value1)
        const v2 = stubReturnsSuccess(value1)
        const v3 = stubReturnsSuccess(value1)
        const validator = allOfValidator([v1, v2, v3])
        const validation = validator(value1)
        expect(validation).toEqualSuccessWithValue(value1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
        expect(v3.calledWith(value1)).toBeTrue()
      })
    })
  })
  describe(`with an invalid value`, () => {
    describe(`with first validation failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const v1 = stubReturnsFailure(payload1)
        const v2 = stubReturnsSuccess(value1)
        const v3 = stubReturnsSuccess(value1)
        const validator = allOfValidator([v1, v2, v3])
        const validation = validator(value1)
        expect(validation).toEqualFailureWithValue(payload1)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
        expect(v3.calledWith(value1)).toBeTrue()
      })
    })

    describe(`with second validation failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const v1 = stubReturnsSuccess(value1)
        const v2 = stubReturnsFailure(payload2)
        const v3 = stubReturnsSuccess(value1)
        const validator = allOfValidator([v1, v2, v3])
        const validation = validator(value1)
        expect(validation).toEqualFailureWithValue(payload2)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
        expect(v3.calledWith(value1)).toBeTrue()
      })
    })
    describe(`with third validation failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const v1 = stubReturnsSuccess(value1)
        const v2 = stubReturnsSuccess(value1)
        const v3 = stubReturnsFailure(payload3)
        const validator = allOfValidator([v1, v2, v3])
        const validation = validator(value1)
        expect(validation).toEqualFailureWithValue(payload3)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
        expect(v3.calledWith(value1)).toBeTrue()
      })
    })

    describe(`with all validations failing`, () => {
      it(`returns a Validation.Failure`, () => {
        const v1 = stubReturnsFailure(payload1)
        const v2 = stubReturnsFailure(payload2)
        const v3 = stubReturnsFailure(payload3)
        const validator = allOfValidator([v1, v2, v3])
        const validation = validator(value1)
        expect(validation).toEqualFailureWithValue(
          andMessages([payload1, payload2, payload3])
        )
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value1)).toBeTrue()
        expect(v3.calledWith(value1)).toBeTrue()
      })
    })
  })
})
