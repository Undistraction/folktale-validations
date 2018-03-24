import { key1, value1, key2, value2 } from '../testHelpers/fixtures/generic'
import { fromArgsObj } from '../../index'

describe(`fromArgsObj()`, () => {
  it(`returns a list containing the supplied args`, () => {
    const o = { [key1]: value1, [key2]: value2 }
    const result = fromArgsObj([key1, key2])(o)
    expect(result).toEqual([value1, value2])
  })
})
