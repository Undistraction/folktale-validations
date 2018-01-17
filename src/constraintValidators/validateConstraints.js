import { validation as Validation } from 'folktale';
import validateObjectWithConstraints from './validateObjectKeysWithConstraints';
import CONSTRAINTS from '../constraints';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateIsObject from '../validators/validateIsObject';
import validateIsArrayOf from '../validators/validateIsArrayOf';
import validateIsNotEmpty from '../validators/validateIsNotEmpty';
import validateIsArray from '../validators/validateIsArray';
import wrapFailureMessageWith from '../utils/wrapFailureMessageWith';
import { constraintValidatorErrorMessage } from '../messages';

const { Success, Failure } = Validation;

const constraintErrorMessageWrapper = wrapFailureMessageWith(
  constraintValidatorErrorMessage
);

export default constraints => {
  // Temporary check on constraints object to early-return if not an object
  const constraintsValidation = untilFailureValidator([
    validateIsObject,
    validateIsNotEmpty,
  ])(constraints);

  if (Failure.hasInstance(constraintsValidation)) {
    return constraintErrorMessageWrapper(constraintsValidation);
  }
  const fieldsValidation = untilFailureValidator([
    validateIsArray,
    validateIsNotEmpty,
    validateIsArrayOf(
      untilFailureValidator([
        validateIsObject,
        validateObjectWithConstraints(CONSTRAINTS.fields),
      ])
    ),
  ])(constraints.fields);

  if (Failure.hasInstance(fieldsValidation)) {
    return constraintErrorMessageWrapper(fieldsValidation);
  }

  return Success(constraints);
};
