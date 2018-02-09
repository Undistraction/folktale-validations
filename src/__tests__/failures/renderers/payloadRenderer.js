import { stub } from 'sinon'
import {
  value1,
  value2,
  value3,
} from '../../testHelpers/fixtures/constraintValues'
import payloadRenderer from '../../../failures/renderers/payloadRenderer'

describe(`payloadRenderer()`, () => {
  it(`renders a payload to a message`, () => {
    const expectedMessage = `${value1}-${value2}-${value3}`
    const messageFunction = stub().returns(expectedMessage)
    const lookupMessage = stub().returns(messageFunction)
    const uid = `__uid__`
    const payload = {
      uid,
      args: [value1, value2, value3],
    }
    const configuredPayloadRenderer = payloadRenderer(lookupMessage)

    expect(configuredPayloadRenderer(payload)).toEqual(expectedMessage)
    expect(lookupMessage.calledWith(uid)).toBeTrue()
    expect(messageFunction.calledWith([value1, value2, value3])).toBeTrue()
  })
})
