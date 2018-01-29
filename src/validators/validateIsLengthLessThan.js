import { flip, lt, compose, length, curry } from 'ramda';
import predicateValidator from '../helpers/predicateValidator';

// Use any Ramda relation that returns a boolean for numeric comparison
export default curry((message, stringLength) =>
  predicateValidator(
    message(stringLength),
    compose(flip(lt)(stringLength), length)
  )
);
