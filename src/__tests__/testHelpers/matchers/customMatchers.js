// eslint-disable-next-line no-unused-vars
import JasmineExpect from 'jasmine-expect'
import toEqualWithCompressedWhitespace from './toEqualWithCompressedWhitespace'
import toEqualSuccessWithValue from './toEqualSuccessWithValue'
import toEqualFailureWithValue from './toEqualFailureWithValue'

expect.extend({
  toEqualWithCompressedWhitespace,
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
})
