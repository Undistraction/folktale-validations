import { identity, append, reduce, curry } from 'ramda';
import { isNotEmpty } from 'ramda-adjunct';
import { validation as Validation } from 'folktale';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateObjectKeysWithConstraints from './validateObjectKeysWithConstraints';
import validateObjectValues from '../validators/validateObjectValues';
import applyDefaultsWithConstraints from './applyDefaultsWithConstraints';
import transformValuesWithConstraints from './transformValuesWithConstraints';
import { validatorsMap, constraintsForFieldsWithPropValue } from './utils';
import CONSTRAINTS from '../constraints';
import validateIsObject from '../validators/validateIsObject';
import wrapFailureMessageWith from '../utils/wrapFailureMessageWith';
import { objectValidatorErrorMessage } from '../messages';
import validateIsNotEmpty from '../validators/validateIsNotEmpty';
import validateFieldsWithChildren from './validateFieldsWithChildren';
import validateFieldsWithValue from './validateFieldsWithValue';

const { Success, Failure, collect } = Validation;

const objectErrorMessageWrapper = wrapFailureMessageWith(
  objectValidatorErrorMessage
);

const validateIsObjectNotEmpty = untilFailureValidator([
  validateIsObject,
  validateIsNotEmpty,
]);

// VALIDATE CHILDREN
// -----------------------------------------------------------------------------

// VALIDATE VALUES
// -----------------------------------------------------------------------------

// VALIDATE OBJECT
// -----------------------------------------------------------------------------

export const validateObject = curry((constraints, o) => {
  const objectValidation = validateIsObjectNotEmpty(o);

  if (Failure.hasInstance(objectValidation)) {
    return objectErrorMessageWrapper(objectValidation);
  }

  const result = untilFailureValidator([
    // Validate this object's keys
    validateObjectKeysWithConstraints(
      constraints.fieldsValidator,
      constraints.fields
    ),
    // Validate this object's values
    validateObjectValues(validatorsMap(constraints.fields)),
    applyDefaultsWithConstraints(constraints.fields),
    transformValuesWithConstraints(constraints.fields),
    // Validate nested objects
    validateFieldsWithChildren(constraints.fields),
    validateFieldsWithValue(constraints.fields),
  ])(o);
  return result.orElse(v =>
    // const wrapped = objectErrorMessageWrapper(Failure(v));
    Failure(v)
  );
});

const validateObjectWithConstraints = constraints => o => {
  // Work around cyclical dependency between this file and constraints using
  // a late import.
  // eslint-disable-next-line global-require
  const validateConstraints = require(`./validateConstraints`).default;

  const objectValidation = validateIsObjectNotEmpty(o);

  if (Failure.hasInstance(objectValidation)) {
    return objectErrorMessageWrapper(objectValidation);
  }

  // Avoid recursion if we try and validate CONSTRAINTS with CONSTRAINTS
  return constraints === CONSTRAINTS
    ? validateObject(constraints, o)
    : validateConstraints(constraints).matchWith({
        Success: _ => validateObject(constraints, o),
        Failure: identity,
      });
};

export default validateObjectWithConstraints;
