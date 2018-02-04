import { validation as Validation } from 'folktale'
import { validateArrayElements } from '../../../index'
import { spy, stubReturnsSuccess, stub } from '../../testHelpers/sinon'

const { Success, Failure } = Validation

describe(`validateArrayElements()`, () => {
  const message1 = `message1`
  const message2 = `message2`
  const elementMessage = `elementMessage`
  const elementsMessage = `elementsMessage`
  let elementMessageFunction
  let elementsMessageFunction
  let validatorWithMessages

  beforeEach(() => {
    elementMessageFunction = stub().returns(elementMessage)
    elementsMessageFunction = stub().returns(elementsMessage)
    validatorWithMessages = validateArrayElements(
      elementsMessageFunction,
      elementMessageFunction
    )
  })

  describe(`when array is empty`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = []
      const v1 = spy()
      const validator = validatorWithMessages(v1)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
      expect(v1.notCalled).toBeTrue()
    })
  })

  describe(`when array contains valid items`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = [1, 2, 3]
      const v1 = stubReturnsSuccess()
      const validator = validatorWithMessages(v1)
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
      it(`returns a Validation.Failiure with messsage`, () => {
        const value = [1, 2, 3]
        const v1 = stub()
        v1.onFirstCall().returns(Failure(message1))
        v1.onSecondCall().returns(Success(message1))
        v1.onThirdCall().returns(Success(message1))
        const validator = validatorWithMessages(v1)
        const validation = validator(value)
        expect(validation).toEqualFailureWithValue([elementsMessage])
        expect(elementsMessageFunction.calledWith([elementMessage])).toEqual(
          true
        )
        expect(v1.calledWith(1)).toBeTrue()
        expect(v1.calledWith(2)).toBeTrue()
        expect(v1.calledWith(3)).toBeTrue()
        expect(v1.calledThrice).toBeTrue()
      })
    })

    describe(`as middle item`, () => {
      it(`returns a Validation.Failiure with messsage`, () => {
        const value = [1, 2, 3]
        const v1 = stub()
        v1.onFirstCall().returns(Success())
        v1.onSecondCall().returns(Failure(message1))
        v1.onThirdCall().returns(Success())
        const validator = validatorWithMessages(v1)
        const validation = validator(value)
        expect(validation).toEqualFailureWithValue([elementsMessage])
        expect(elementsMessageFunction.calledWith([elementMessage])).toEqual(
          true
        )
        expect(v1.calledWith(1)).toBeTrue()
        expect(v1.calledWith(2)).toBeTrue()
        expect(v1.calledWith(3)).toBeTrue()
      })
    })

    describe(`as last item`, () => {
      it(`returns a Validation.Failure with messsage`, () => {
        const value = [1, 2, 3]
        const v1 = stub()
        v1.onFirstCall().returns(Success())
        v1.onSecondCall().returns(Success())
        v1.onThirdCall().returns(Failure(message1))
        const validator = validatorWithMessages(v1)
        const validation = validator(value)
        expect(validation).toEqualFailureWithValue([elementsMessage])
        expect(elementsMessageFunction.calledWith([elementMessage])).toEqual(
          true
        )
        expect(v1.calledWith(1)).toBeTrue()
        expect(v1.calledWith(2)).toBeTrue()
        expect(v1.calledWith(3)).toBeTrue()
        expect(v1.calledThrice).toBeTrue()
      })
    })

    describe(`multiple items`, () => {
      it(`returns a Validation.Failiure with messsage`, () => {
        const value = [1, 2, 3]
        const v1 = stub()
        v1.onFirstCall().returns(Failure(message1))
        v1.onSecondCall().returns(Success())
        v1.onThirdCall().returns(Failure(message2))
        const validator = validatorWithMessages(v1)
        const validation = validator(value)
        expect(validation).toEqualFailureWithValue([elementsMessage])
        expect(
          elementsMessageFunction.calledWith([elementMessage, elementMessage])
        ).toBeTrue()
        expect(v1.calledWith(1)).toBeTrue()
        expect(v1.calledWith(2)).toBeTrue()
        expect(v1.calledWith(3)).toBeTrue()
        expect(v1.calledThrice).toBeTrue()
      })
    })
  })
})
