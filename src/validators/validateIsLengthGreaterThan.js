import { flip, gt, compose, length, curry } from 'ramda';
import predicateValidator from '../helpers/predicateValidator';

export default curry((message, stringLength) =>
  predicateValidator(
    message(stringLength),
    compose(flip(gt)(stringLength), length)
  )
);
