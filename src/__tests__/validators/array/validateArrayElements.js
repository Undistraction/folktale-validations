import { validation as Validation } from 'folktale'
import { validateArrayElements } from '../../../index'
import { spy, stubReturnsSuccess, stub } from '../../testHelpers/sinon'
import toPayload from '../../../failures/toPayload'
import {
  value1,
  value2,
  value3,
  uid1,
  uid2,
  uid3,
} from '../../testHelpers/fixtures/generic'
import { toArrayError } from '../../../failures/utils'

const { Success, Failure } = Validation

describe(`validateArrayElements()`, () => {
  const element1Payload = toPayload(uid1, value1)
  const element2Payload = toPayload(uid2, value2)
  const element3Payload = toPayload(uid3, value3)

  describe(`when array is empty`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = []
      const v1 = spy()
      const validator = validateArrayElements(v1)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
      expect(v1.notCalled).toBeTrue()
    })
  })

  describe(`when array contains valid items`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = [1, 2, 3]
      const v1 = stubReturnsSuccess()
      const validator = validateArrayElements(v1)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
      expect(v1.calledThrice).toBeTrue()
      expect(v1.calledWith(1)).toBeTrue()
      expect(v1.calledWith(2)).toBeTrue()
      expect(v1.calledWith(3)).toBeTrue()
    })
  })

  describe(`when array contains invalid items`, () => {
    describe(`as first item`, () => {
      it(`returns a Validation.Failure with messsage`, () => {
        const value = [value1, value2, value3]
        const v1 = stub()
        v1.onFirstCall().returns(Failure(element1Payload))
        v1.onSecondCall().returns(Success(2))
        v1.onThirdCall().returns(Success(3))
        const payload = toArrayError([[0, element1Payload]])

        const validator = validateArrayElements(v1)
        const validation = validator(value)
        expect(validation).toEqualFailureWithValue(payload)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v1.calledWith(value2)).toBeTrue()
        expect(v1.calledWith(value3)).toBeTrue()
        expect(v1.calledThrice).toBeTrue()
      })
    })

    describe(`as middle item`, () => {
      it(`returns a Validation.Failure with messsage`, () => {
        const value = [value1, value2, value3]
        const v1 = stub()
        v1.onFirstCall().returns(Success(1))
        v1.onSecondCall().returns(Failure(element2Payload))
        v1.onThirdCall().returns(Success(3))
        const payload = toArrayError([[1, element2Payload]])

        const validator = validateArrayElements(v1)
        const validation = validator(value)
        expect(validation).toEqualFailureWithValue(payload)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v1.calledWith(value2)).toBeTrue()
        expect(v1.calledWith(value3)).toBeTrue()
        expect(v1.calledThrice).toBeTrue()
      })
    })

    describe(`as last item`, () => {
      it(`returns a Validation.Failure with messsage`, () => {
        const value = [value1, value2, value3]
        const v1 = stub()
        v1.onFirstCall().returns(Success(1))
        v1.onSecondCall().returns(Success(2))
        v1.onThirdCall().returns(Failure(element3Payload))
        const payload = toArrayError([[2, element3Payload]])

        const validator = validateArrayElements(v1)
        const validation = validator(value)
        expect(validation).toEqualFailureWithValue(payload)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v1.calledWith(value2)).toBeTrue()
        expect(v1.calledWith(value3)).toBeTrue()
        expect(v1.calledThrice).toBeTrue()
      })
    })

    describe(`multiple items`, () => {
      it(`returns a Validation.Failure with messsage`, () => {
        const value = [value1, value2, value3]
        const v1 = stub()
        v1.onFirstCall().returns(Failure(element1Payload))
        v1.onSecondCall().returns(Success(2))
        v1.onThirdCall().returns(Failure(element3Payload))
        const payload = toArrayError([
          [0, element1Payload],
          [2, element3Payload],
        ])

        const validator = validateArrayElements(v1)
        const validation = validator(value)
        expect(validation).toEqualFailureWithValue(payload)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v1.calledWith(value2)).toBeTrue()
        expect(v1.calledWith(value3)).toBeTrue()
        expect(v1.calledThrice).toBeTrue()
      })
    })
  })
})
