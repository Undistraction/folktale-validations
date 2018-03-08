// eslint-disable-next-line no-unused-vars
import JasmineExpect from 'jasmine-expect'
import { toEqualMultiline } from 'jasmine-multiline-matchers'
import {
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
} from 'jasmine-folktale'
import toEqualWithCompressedWhitespace from './toEqualWithCompressedWhitespace'

expect.extend({
  toEqualWithCompressedWhitespace,
  toEqualMultiline,
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
})
