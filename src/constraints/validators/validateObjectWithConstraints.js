import { identity, curry, always } from 'ramda';
import { ROOT_FIELD } from '../../const';
import validateObject from './validateObject';
import { constraintsAreOwnConstraints } from '../utils';
import validateConstraints from './validateConstraints';

const validateObjectWithConstraints = curry(
  (constraints, o) =>
    // If we try and validate our own constraint object with itself we enter an
    // infinite loop, so skip validation for our own constraints.
    constraintsAreOwnConstraints(constraints)
      ? validateObject(ROOT_FIELD, constraints, o)
      : validateConstraints(validateObjectWithConstraints)(
          constraints
        ).matchWith({
          Success: always(validateObject(ROOT_FIELD, constraints, o)),
          Failure: identity,
        })
);

export default validateObjectWithConstraints;
