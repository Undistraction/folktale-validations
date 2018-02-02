import { always, compose } from 'ramda';
import { validation as Validation } from 'folktale';
import { toConstraintsError } from '../../errors/utils';
import { propValue } from '../../utils';

const { Failure, Success } = Validation;

export default (
  ownConstraints,
  validateObjectWithConstraints
) => constraintsToValidate =>
  validateObjectWithConstraints(
    ownConstraints,
    constraintsToValidate
  ).matchWith({
    Success: always(Success(constraintsToValidate)),
    Failure: compose(Failure, toConstraintsError, propValue),
  });
