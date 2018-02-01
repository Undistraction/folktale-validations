import { identity, curry, always } from 'ramda';
import { ROOT_FIELD } from '../../const';
import validateObject from './validateObject';
import { constraintsAreOwnConstraints } from '../utils';

export default curry((constraints, o) => {
  // Work around cyclical dependency between this file and constraints using
  // a late import.
  // eslint-disable-next-line global-require
  const validateConstraints = require(`./validateConstraints`).default;

  // If we try and validate our own constraint object with itself we enter an
  // infinite loop, so skip validation for our own constraints.
  return constraintsAreOwnConstraints(constraints)
    ? validateObject(ROOT_FIELD, constraints, o)
    : validateConstraints(constraints).matchWith({
        Success: always(validateObject(ROOT_FIELD, constraints, o)),
        Failure: identity,
      });
});
