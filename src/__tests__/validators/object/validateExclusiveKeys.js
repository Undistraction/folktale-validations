import { stub } from 'sinon'
import validateExclusiveKeys from '../../../validators/object/validateExclusiveKeys'

describe(`validateExclusiveKeys`, () => {
  const key1 = `a`
  const key2 = `b`
  const key3 = `c`

  const value = {
    [key1]: 1,
    [key2]: 2,
    [key3]: 3,
  }

  const message = `message`
  let messageFunction
  let validatorWithMessage

  beforeEach(() => {
    messageFunction = stub().returns(message)
    validatorWithMessage = validateExclusiveKeys(messageFunction)
  })

  describe(`with no exclusive keys defined`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const exlusiveKeys = []
      const validator = validatorWithMessage(exlusiveKeys)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`with no exclusive keys present`, () => {
    it(`returns a Validation.Success with supplied value`, () => {
      const exlusiveKeys = [`d`]
      const validator = validatorWithMessage(exlusiveKeys)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`with one exclusive key defined and present`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const exlusiveKeys = [key1]
      const validator = validatorWithMessage(exlusiveKeys)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
    })
  })

  describe(`with two exclusive key defined and present`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const exlusiveKeys = [key1, key2]
      const validator = validatorWithMessage(exlusiveKeys)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue([message])
      expect(messageFunction.calledWith([key1, key2])).toBeTrue()
    })
  })

  describe(`with two exclusive key defined and present`, () => {
    it(`returns a Validation.Failure with message`, () => {
      const exlusiveKeys = [key1, key2, key3]
      const validator = validatorWithMessage(exlusiveKeys)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue([message])
      expect(messageFunction.calledWith([key1, key2, key3])).toBeTrue()
    })
  })
})
