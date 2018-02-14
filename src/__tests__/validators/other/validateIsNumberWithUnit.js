import { map } from 'ramda'
import { validateIsNumberWithUnit } from '../../../index'
import typeData from '../../testHelpers/fixtures/typeData'
import toPayload from '../../../failures/toPayload'
import { IS_NUMBER_WITH_UNIT } from '../../../const/validatorUids'

describe(`validateIsNumberWithUnit`, () => {
  const unit = `xx`
  describe(`when value is valid`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      map(number => {
        const value = `${number}${unit}`
        const validator = validateIsNumberWithUnit(unit)
        const result = validator(value)
        expect(result).toEqualSuccessWithValue(value)
      })(typeData.validNumericValues)
    })
  })

  describe(`when value is invalid`, () => {
    describe(`with unitless numbers`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        map(value => {
          const expectedPayload = toPayload(IS_NUMBER_WITH_UNIT, value, [unit])
          const validator = validateIsNumberWithUnit(unit)
          const result = validator(value)
          expect(result).toEqualFailureWithValue(expectedPayload)
        })(typeData.validNumericValues)
      })
    })

    describe(`with wrong unit`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        const numbers = [`0yy`, `0.5y`, `-0.5xy`]
        map(value => {
          const expectedPayload = toPayload(IS_NUMBER_WITH_UNIT, value, [unit])
          const validator = validateIsNumberWithUnit(unit)
          const result = validator(value)
          expect(result).toEqualFailureWithValue(expectedPayload)
        })(numbers)
      })
    })

    describe(`with other invalid values`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        map(value => {
          const expectedPayload = toPayload(IS_NUMBER_WITH_UNIT, value, [unit])
          const validator = validateIsNumberWithUnit(unit)
          const result = validator(value)
          expect(result).toEqualFailureWithValue(expectedPayload)
        })(typeData.withoutValidNumericValues)
      })
    })
  })
})
