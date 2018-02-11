import { value1 } from '../testHelpers/fixtures/generic'
import toPayload from '../../failures/toPayload'

describe(`toPayload`, () => {
  it(`creates a payload object with correct fields`, () => {
    const uid = `uid`
    const args = [1, 2, 3]
    const value = value1

    const payload = toPayload(uid, value, args)

    expect(payload).toEqual({
      uid,
      value,
      args,
    })
  })
})
