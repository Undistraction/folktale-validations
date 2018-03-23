import { F, T } from 'ramda'
import {
  spy,
  stubReturnsSuccess,
  stubReturnsFailure,
} from '../testHelpers/sinon'
import whenValidator from '../../helpers/whenValidator'
import { value1 } from '../testHelpers/fixtures/generic'

describe(`whenValidator`, () => {
  describe(`when predicate returns false`, () => {
    it(`always returns a Validation.Success`, () => {
      const v = spy()
      const validator = whenValidator(F, v)
      const result = validator(value1)
      expect(result).toEqualSuccessWithValue(value1)
      expect(v.notCalled).toBeTrue()
    })
  })

  describe(`when the predicate returns true`, () => {
    describe(`when the validation succeeds`, () => {
      it(`returns a Validation.Success`, () => {
        const v = stubReturnsSuccess(value1)
        const validator = whenValidator(T, v)
        const result = validator(value1)
        expect(result).toEqualSuccessWithValue(value1)
      })
    })

    describe(`when the validation fails`, () => {
      it(`returns a Validation.Failure`, () => {
        const v = stubReturnsFailure(value1)
        const validator = whenValidator(T, v)
        const result = validator(value1)
        expect(result).toEqualFailureWithValue(value1)
      })
    })
  })
})
