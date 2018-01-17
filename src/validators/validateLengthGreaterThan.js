import { flip, gt, compose, length } from 'ramda';
import predicateValidator from '../helpers/predicateValidator';
import { lengthGreaterThanErrorMessage } from '../messages';

// Use any Ramda relation that returns a boolean for numeric comparison
export default stringLength =>
  predicateValidator(
    lengthGreaterThanErrorMessage(stringLength),
    compose(flip(gt)(stringLength), length)
  );
