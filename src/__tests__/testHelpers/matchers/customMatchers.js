import toEqualWithCompressedWhitespace from './toEqualWithCompressedWhitespace';
import toEqualSuccessWithValue from './toEqualSuccessWithValue';
import toEqualFailureWithValue from './toEqualFailureWithValue';
import toBeTrue from './toBeTrue';

expect.extend({
  toEqualWithCompressedWhitespace,
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
  toBeTrue,
});
