import sinon from 'sinon'
import predicateValidator from '../../helpers/predicateValidator'
import toPayload from '../../failures/toPayload'

describe(`predicateValidator`, () => {
  const uid = `uid`
  const args = [1, 2]
  describe(`with a valid value`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const predicate = sinon.stub().returns(true)
      const value = true
      const validator = predicateValidator(predicate, uid, args)
      const validation = validator(value)
      expect(validation).toEqualSuccessWithValue(value)
      expect(predicate.calledOnce).toBeTrue()
      expect(predicate.calledWith(value)).toBeTrue()
    })
  })

  describe(`with an invalid value`, () => {
    it(`returns a Validation.Failure with a message`, () => {
      const value = true
      const predicate = sinon.stub().returns(false)
      const expectedPayload = toPayload(uid, value, args)
      const validator = predicateValidator(predicate, uid, args)
      const validation = validator(value)
      expect(validation).toEqualFailureWithValue(expectedPayload)
      expect(predicate.calledOnce).toBeTrue()
      expect(predicate.calledWith(value)).toBeTrue()
    })
  })
})
