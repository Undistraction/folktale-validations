import { compose, length, __ } from 'ramda';
import predicateValidator from '../helpers/predicateValidator';
import { isInvalidLengthErrorMessage } from '../messages';

// Use any Ramda relation that returns a boolean for numeric comparison
export default (relation, comparator) =>
  predicateValidator(
    isInvalidLengthErrorMessage(),
    compose(relation(__, comparator), length)
  );
