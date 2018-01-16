import { flip, lt, compose, length } from 'ramda';
import predicateValidator from '../helpers/predicateValidator';
import { lengthLessThanErrorMessage } from '../messages';

// Use any Ramda relation that returns a boolean for numeric comparison
export default stringLength =>
  predicateValidator(
    lengthLessThanErrorMessage(stringLength),
    compose(flip(lt)(stringLength), length)
  );
