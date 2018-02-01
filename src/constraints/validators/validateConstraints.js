import { always } from 'ramda';
import { validation as Validation } from 'folktale';
import CONSTRAINTS from '../../constraints';
import wrapFailureMessageWith from '../../utils/wrapFailureMessageWith';
import { constraintValidatorErrorMessage } from '../../messages';

const { Success } = Validation;

const constraintErrorMessageWrapper = wrapFailureMessageWith(
  constraintValidatorErrorMessage
);

export default validateObjectWithConstraints => o => {
  const result = validateObjectWithConstraints(CONSTRAINTS, o);

  return result.matchWith({
    Success: always(Success(o)),
    Failure: constraintErrorMessageWrapper,
  });
};
