import toEqualWithCompressedWhitespace from './toEqualWithCompressedWhitespace';
import toEqualSuccessWithValue from './toEqualSuccessWithValue';
import toEqualFailureWithValue from './toEqualFailureWithValue';

expect.extend({
  toEqualWithCompressedWhitespace,
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
});
