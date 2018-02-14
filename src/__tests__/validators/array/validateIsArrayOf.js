import { validation as Validation } from 'folktale'
import { validateIsArrayOf } from '../../../index'
import { spy, stubReturnsSuccess, stub } from '../../testHelpers/sinon'
import toPayload from '../../../failures/toPayload'
import { IS_ARRAY } from '../../../const/validatorUids'
import {
  value1,
  value2,
  value3,
  payload1,
} from '../../testHelpers/fixtures/generic'
import { toArrayError } from '../../../utils/failures'

const { Success, Failure } = Validation

describe(`validateIsArrayOf()`, () => {
  describe(`argument is an array`, () => {
    describe(`when array is empty`, () => {
      it(`returns a Validation.Success with the supplied value`, () => {
        const value = []
        const v1 = spy()
        const validator = validateIsArrayOf(v1)
        const validation = validator(value)
        expect(validation).toEqualSuccessWithValue(value)
        expect(v1.notCalled).toBeTrue()
      })
    })
  })

  describe(`argument is not an array`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const v1 = spy()
      const expectedPayload = toPayload(IS_ARRAY, undefined)
      const validator = validateIsArrayOf(v1)
      const validation = validator()
      expect(validation).toEqualFailureWithValue(expectedPayload)
      expect(v1.notCalled).toBeTrue()
    })
  })

  describe(`array contains valid items`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = [value1, value2, value3]
      const v1 = stubReturnsSuccess()
      const validator = validateIsArrayOf(v1)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
      expect(v1.calledThrice).toBeTrue()
      expect(v1.calledWith(value1)).toBeTrue()
      expect(v1.calledWith(value2)).toBeTrue()
      expect(v1.calledWith(value3)).toBeTrue()
      expect(v1.calledThrice).toBeTrue()
    })
  })

  describe(`array contains invalid item`, () => {
    it(`returns a Validation.Failure with messsage`, () => {
      const value = [value1, value2, value3]
      const v1 = stub()
      const expectedPayload = toArrayError([[2, payload1]])
      v1.onFirstCall().returns(Success())
      v1.onSecondCall().returns(Success())
      v1.onThirdCall().returns(Failure(payload1))
      const validator = validateIsArrayOf(v1)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue(expectedPayload)
      expect(v1.calledWith(value1)).toBeTrue()
      expect(v1.calledWith(value2)).toBeTrue()
      expect(v1.calledWith(value3)).toBeTrue()
      expect(v1.calledThrice).toBeTrue()
    })
  })
})
