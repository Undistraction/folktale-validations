import { identity, curry, equals } from 'ramda';
import { validation as Validation } from 'folktale';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateObjectKeysWithConstraints from './validateObjectKeysWithConstraints';
import applyDefaultsWithConstraints from './applyDefaultsWithConstraints';
import transformValuesWithConstraints from './transformValuesWithConstraints';
import { validatorsMap } from './utils';
import CONSTRAINTS from '../constraints';
import wrapFailureMessageWith from '../utils/wrapFailureMessageWith';
import { objectValidatorErrorMessage } from '../messages';
import validateFieldsWithValue from './validateFieldsWithValue';
import { ROOT_FIELD } from '../const';
import validateFieldsWithChildren from './validateFieldsWithChildren';
import configuredValidators from '../configuredValidators';

const { Failure } = Validation;

const objectErrorMessageWrapper = fieldName =>
  wrapFailureMessageWith(objectValidatorErrorMessage(fieldName));

const constraintsAreOwnConstraints = equals(CONSTRAINTS);

export const validateObject = curry((fieldName, constraints, o) => {
  const result = untilFailureValidator([
    // Validate this object's keys

    validateObjectKeysWithConstraints(
      constraints.fieldsValidator,
      constraints.fields
    ),
    // Validate this object's values
    configuredValidators.validateObjectValues(
      validatorsMap(constraints.fields)
    ),
    applyDefaultsWithConstraints(constraints.fields),
    transformValuesWithConstraints(constraints.fields),
    // Validate nested objects
    validateFieldsWithValue(constraints.fields),
    validateFieldsWithChildren(constraints.fields),
  ])(o);
  return result.orElse(v => objectErrorMessageWrapper(fieldName)(Failure(v)));
});

const validateObjectWithConstraints = constraints => o => {
  // Work around cyclical dependency between this file and constraints using
  // a late import.
  // eslint-disable-next-line global-require
  const validateConstraints = require(`./validateConstraints`).default;

  const objectValidation = configuredValidators.validateIsObject(o);

  if (Failure.hasInstance(objectValidation)) {
    return objectErrorMessageWrapper(ROOT_FIELD)(objectValidation);
  }

  // Avoid recursion if we try and validate CONSTRAINTS with itself
  return constraintsAreOwnConstraints(constraints)
    ? validateObject(ROOT_FIELD, constraints, o)
    : validateConstraints(constraints).matchWith({
        Success: _ => validateObject(ROOT_FIELD, constraints, o),
        Failure: identity,
      });
};

export default validateObjectWithConstraints;
