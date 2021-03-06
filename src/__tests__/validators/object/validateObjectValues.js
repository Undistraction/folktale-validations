import { validateObjectValues } from '../../../index'
import {
  spy,
  stubReturnsFailure,
  stubReturnsSuccess,
} from '../../testHelpers/sinon'
import {
  key1,
  key2,
  key3,
  value1,
  value2,
  value3,
  funcWhichThrows,
} from '../../testHelpers/fixtures/generic'
import { VALIDATE_OBJECT_VALUES } from '../../../const/validatorUids'
import toPayload from '../../../failures/toPayload'

describe(`validateObjectValues()`, () => {
  const key1Payload = toPayload(VALIDATE_OBJECT_VALUES, value1)
  const key2Payload = toPayload(VALIDATE_OBJECT_VALUES, value2)
  const key3Payload = toPayload(VALIDATE_OBJECT_VALUES, value3)

  describe(`with valid values`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const v1 = stubReturnsSuccess()
      const v2 = stubReturnsSuccess()
      const value = {
        [key1]: value1,
        [key2]: value2,
      }
      const validators = {
        [key1]: v1,
        [key2]: v2,
      }
      const validator = validateObjectValues(validators)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
      expect(v1.calledWith(value1)).toBeTrue()
      expect(v2.calledWith(value2)).toBeTrue()
    })
  })

  describe(`with invalid values`, () => {
    describe(`with first value invalid`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        const v1 = stubReturnsFailure(key1Payload)
        const v2 = stubReturnsSuccess()

        const expectedPayload = {
          fields: {
            [key1]: key1Payload,
          },
        }

        const value = {
          [key1]: value1,
          [key2]: value2,
        }
        const validators = {
          [key1]: v1,
          [key2]: v2,
        }
        const validator = validateObjectValues(validators)
        const validation = validator(value)

        expect(validation).toEqualFailureWithValue(expectedPayload)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value2)).toBeTrue()
      })
    })

    describe(`with second value invalid`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        const v1 = stubReturnsSuccess()
        const v2 = stubReturnsFailure(key2Payload)

        const expectedPayload = {
          fields: {
            [key2]: key2Payload,
          },
        }

        const value = {
          [key1]: value1,
          [key2]: value2,
        }
        const validators = {
          [key1]: v1,
          [key2]: v2,
        }
        const validator = validateObjectValues(validators)
        const validation = validator(value)

        expect(validation).toEqualFailureWithValue(expectedPayload)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value2)).toBeTrue()
      })
    })

    describe(`with all values invalid`, () => {
      it(`returns a Validation.Failure with payload`, () => {
        const v1 = stubReturnsFailure(key1Payload)
        const v2 = stubReturnsFailure(key2Payload)
        const v3 = stubReturnsFailure(key3Payload)

        const expectedPayload = {
          fields: {
            [key1]: key1Payload,
            [key2]: key2Payload,
            [key3]: key3Payload,
          },
        }

        const value = {
          [key1]: value1,
          [key2]: value2,
          [key3]: value3,
        }
        const validators = {
          [key1]: v1,
          [key2]: v2,
          [key3]: v3,
        }
        const validator = validateObjectValues(validators)
        const validation = validator(value)
        expect(validation).toEqualFailureWithValue(expectedPayload)
        expect(v1.calledWith(value1)).toBeTrue()
        expect(v2.calledWith(value2)).toBeTrue()
        expect(v3.calledWith(value3)).toBeTrue()
      })
    })
  })

  describe(`with no validator for key`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const v1 = spy()
      const value = {
        [key1]: value1,
      }
      const validators = {}
      const validator = validateObjectValues(validators)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
      expect(v1.notCalled).toBeTrue()
    })
  })

  describe(`with a validator but no key`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const v1 = spy()
      const value = {
        [key1]: value1,
      }
      const validators = {
        [key2]: v1,
      }
      const validator = validateObjectValues(validators)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
      expect(v1.notCalled).toBeTrue()
    })
  })

  describe(`with a validator throwing an error`, () => {
    it(`throws an error with a helpful message`, () => {
      const v1 = funcWhichThrows
      const value = {
        [key1]: value1,
      }
      const validators = {
        [key1]: v1,
      }
      const validator = validateObjectValues(validators)
      expect(() => validator(value)).toThrow(
        `[validator] A validator threw an error for prop name: 'key1' with value 'value1'`
      )
    })
  })
})
