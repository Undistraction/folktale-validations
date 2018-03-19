import { map } from 'ramda'
import { validateIsValidPositiveNumberWithUnit } from '../../../index'
import typeData from '../../testHelpers/fixtures/typeData'
import toPayload from '../../../failures/toPayload'
import { VALIDATE_IS_VALID_POSITIVE_NUMBER_WITH_UNIT } from '../../../const/validatorUids'

describe(`validateIsValidPositiveNumberWithUnit`, () => {
  const unit = `xx`
  describe(`when value is valid`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      map(number => {
        const value = `${number}${unit}`
        const validator = validateIsValidPositiveNumberWithUnit(unit)
        const result = validator(value)
        expect(result).toEqualSuccessWithValue(value)
      })(typeData.validPositiveNumericValues)
    })
  })

  describe(`when value is invalid`, () => {
    describe(`with unitless numbers`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        map(value => {
          const expectedPayload = toPayload(
            VALIDATE_IS_VALID_POSITIVE_NUMBER_WITH_UNIT,
            value,
            [unit]
          )
          const validator = validateIsValidPositiveNumberWithUnit(unit)
          const result = validator(value)
          expect(result).toEqualFailureWithValue(expectedPayload)
        })(typeData.validPositiveNumericValues)
      })
    })

    describe(`with wrong unit`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        const numbers = [`0yy`, `0.5y`]
        map(value => {
          const expectedPayload = toPayload(
            VALIDATE_IS_VALID_POSITIVE_NUMBER_WITH_UNIT,
            value,
            [unit]
          )
          const validator = validateIsValidPositiveNumberWithUnit(unit)
          const result = validator(value)
          expect(result).toEqualFailureWithValue(expectedPayload)
        })(numbers)
      })

      describe(`with negative numbers`, () => {
        it(`returns a Validation.Failure with payload`, () => {
          map(number => {
            const value = `${number}${unit}`
            const expectedPayload = toPayload(
              VALIDATE_IS_VALID_POSITIVE_NUMBER_WITH_UNIT,
              value,
              [unit]
            )
            const validator = validateIsValidPositiveNumberWithUnit(unit)
            const result = validator(value)
            expect(result).toEqualFailureWithValue(expectedPayload)
          })(typeData.validNonPositiveNumericValues)
        })
      })

      describe(`with other invalid values`, () => {
        it(`returns a Validation.Failure with payload`, () => {
          map(value => {
            const expectedPayload = toPayload(
              VALIDATE_IS_VALID_POSITIVE_NUMBER_WITH_UNIT,
              value,
              [unit]
            )
            const validator = validateIsValidPositiveNumberWithUnit(unit)
            const result = validator(value)
            expect(result).toEqualFailureWithValue(expectedPayload)
          })(typeData.withoutValidNumericValues)
        })
      })
    })
  })
})
