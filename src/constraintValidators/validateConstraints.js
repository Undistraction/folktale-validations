import { validation as Validation } from 'folktale';
import CONSTRAINTS from '../constraints';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateIsObject from '../validators/validateIsObject';
import validateIsArrayOf from '../validators/validateIsArrayOf';
import validateIsNotEmpty from '../validators/validateIsNotEmpty';
import validateIsArray from '../validators/validateIsArray';
import validateObjectWithConstraints from './validateObjectWithConstraints';
import wrapFailureMessageWith from '../utils/wrapFailureMessageWith';
import { constraintValidatorErrorMessage } from '../messages';

const { Success, Failure } = Validation;

const constraintErrorMessageWrapper = wrapFailureMessageWith(
  constraintValidatorErrorMessage
);

export default o => {
  // Temporary check on constraints object to early-return if not an object
  const constraintsValidation = untilFailureValidator([
    validateIsObject,
    validateIsNotEmpty,
  ])(o);

  if (Failure.hasInstance(constraintsValidation)) {
    return constraintErrorMessageWrapper(constraintsValidation);
  }

  if (o.fields) {
    const fieldsValidation = untilFailureValidator([
      validateIsArray,
      validateIsNotEmpty,
      validateIsArrayOf(
        untilFailureValidator([
          validateIsObject,
          validateObjectWithConstraints(CONSTRAINTS),
        ])
      ),
    ])(o.fields);
    if (Failure.hasInstance(fieldsValidation)) {
      return constraintErrorMessageWrapper(fieldsValidation);
    }
  }

  return Success(o);
};
