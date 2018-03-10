// eslint-disable-next-line no-unused-vars
import JasmineExpect from 'jasmine-expect'
import { toEqualMultiline } from 'jasmine-multiline-matchers'
import {
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
} from 'jasmine-folktale'

expect.extend({
  toEqualMultiline,
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
})
