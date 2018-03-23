import {
  key1,
  value1,
  key2,
  key3,
  value3,
  key4,
} from '../testHelpers/fixtures/generic'
import { toArgsObj } from '../../index'

describe(`toArgsObj`, () => {
  it(`removes undefined props`, () => {
    const o = {
      [key1]: value1,
      [key2]: undefined,
      [key3]: value3,
      [key4]: undefined,
    }
    const result = toArgsObj(o)
    const expected = {
      [key1]: value1,
      [key3]: value3,
    }
    expect(result).toEqual(expected)
  })

  it(`doesn't remove null or NaN values`, () => {
    const o = {
      [key1]: NaN,
      [key2]: null,
    }
    const result = toArgsObj(o)
    const expected = {
      [key1]: NaN,
      [key2]: null,
    }
    expect(result).toEqual(expected)
  })
})
