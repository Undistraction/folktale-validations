import { always } from 'ramda';
import { validation as Validation } from 'folktale';
import { constraintErrorMessageWrapper } from '../../messages';

const { Success } = Validation;

export default (
  ownConstraints,
  validateObjectWithConstraints
) => constraintsToValidate =>
  validateObjectWithConstraints(
    ownConstraints,
    constraintsToValidate
  ).matchWith({
    Success: always(Success(constraintsToValidate)),
    Failure: constraintErrorMessageWrapper,
  });
