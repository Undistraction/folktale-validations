import { validation as Validation } from 'folktale';
import CONSTRAINTS from '../constraints';
import validateObjectWithConstraints from './validateObjectWithConstraints';
import wrapFailureMessageWith from '../utils/wrapFailureMessageWith';
import { constraintValidatorErrorMessage } from '../messages';

const { Success } = Validation;

const constraintErrorMessageWrapper = wrapFailureMessageWith(
  constraintValidatorErrorMessage
);

export default o => {
  const result = validateObjectWithConstraints(CONSTRAINTS)(o);

  return result.matchWith({
    Success: _ => Success(o),
    Failure: constraintErrorMessageWrapper,
  });
};
