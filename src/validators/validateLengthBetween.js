import { curry } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateLengthGreaterThan from './validateLengthGreaterThan';
import validateLengthLessThan from './validateLengthLessThan';

export default curry((minimumLength, maximumLength) =>
  untilFailureValidator([
    validateLengthGreaterThan(minimumLength),
    validateLengthLessThan(maximumLength),
  ])
);
