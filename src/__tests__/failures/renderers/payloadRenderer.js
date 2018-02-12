import { stub } from 'sinon'
import {
  value1,
  value2,
  value3,
  uid1,
  message1,
} from '../../testHelpers/fixtures/generic'
import payloadRenderer from '../../../failures/renderers/payloadRenderer'

describe(`payloadRenderer()`, () => {
  it(`renders a payload to a message`, () => {
    const messageFunction = stub().returns(message1)
    const lookupMessage = stub().returns(messageFunction)
    const payload = {
      uid: uid1,
      value: null,
      args: [value1, value2, value3],
    }
    const configuredPayloadRenderer = payloadRenderer(lookupMessage)
    const result = configuredPayloadRenderer(payload)
    expect(result).toEqual(message1)
    expect(lookupMessage.calledWith(uid1)).toBeTrue()
    expect(messageFunction.calledWith(value1, value2, value3)).toBeTrue()
  })
})
