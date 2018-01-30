import { curry } from 'ramda';
import untilFailureValidator from '../../helpers/untilFailureValidator';
import validateIsLengthGreaterThan from './validateIsLengthGreaterThan';
import validateIsLengthLessThan from './validateIsLengthLessThan';

export default curry(
  (
    isLengthGreaterThanMessage,
    isLengthLessThanMessage,
    minimumLength,
    maximumLength
  ) =>
    untilFailureValidator([
      validateIsLengthGreaterThan(isLengthGreaterThanMessage, minimumLength),
      validateIsLengthLessThan(isLengthLessThanMessage, maximumLength),
    ])
);
