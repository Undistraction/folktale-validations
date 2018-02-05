import { stub } from 'sinon'
import { validation as Validation } from 'folktale'
import { map } from 'ramda'
import { numberWithUnitValidator } from '../../index'
import typeData from '../testHelpers/fixtures/typeData'

const { Failure } = Validation

describe(`numberWithUnitValidator`, () => {
  const message = `message`
  let messageFunction
  let validatorWithMessage

  beforeEach(() => {
    messageFunction = stub().returns(message)
    validatorWithMessage = numberWithUnitValidator(messageFunction)
  })

  describe(`when value is valid`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      map(number => {
        const unit = `xx`
        const value = `${number}${unit}`
        const validator = validatorWithMessage(unit)
        const result = validator(value)
        expect(result).toEqualSuccessWithValue(value)
        expect(messageFunction.calledWith(unit)).toBeTrue()
      })(typeData.validNumericValues)
    })
  })

  describe(`when value is invalid`, () => {
    describe(`with unitless numbers`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(number => {
          const unit = `px`
          const value = `${number}`
          const validator = validatorWithMessage(unit)
          const result = validator(value)
          expect(result).toEqualFailureWithValue([message])
          expect(messageFunction.calledWith(unit)).toBeTrue()
        })(typeData.validNumericValues)
      })
    })

    describe(`with united values`, () => {
      it(`returns a Validation.Failure with message`, () => {
        const numbers = [`0yy`, `0.5y`, `-0.5xy`]
        map(number => {
          const unit = `px`
          const value = `${number}`
          const validator = validatorWithMessage(unit)
          const result = validator(value)
          expect(Failure.hasInstance(result)).toBeTrue()
          expect(result).toEqualFailureWithValue([message])
          expect(messageFunction.calledWith(unit)).toBeTrue()
        })(numbers)
      })
    })

    describe(`with other invalid values`, () => {
      it(`returns a Validation.Failure with message`, () => {
        map(number => {
          const unit = `px`
          const value = `${number}`
          const validator = validatorWithMessage(unit)
          const result = validator(value)
          expect(result).toEqualFailureWithValue([message])
          expect(messageFunction.calledWith(unit)).toBeTrue()
        })(typeData.withoutValidNumericValues)
      })
    })
  })
})
