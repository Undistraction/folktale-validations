import { identity, curry, equals, always, compose } from 'ramda';
import { validation as Validation } from 'folktale';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateObjectKeysWithConstraints from './validateObjectKeysWithConstraints';
import applyDefaultsWithConstraints from './applyDefaultsWithConstraints';
import transformValuesWithConstraints from './transformValuesWithConstraints';
import { buildValidatorsMap } from './utils';
import CONSTRAINTS from '../constraints';
import wrapFailureMessageWith from '../utils/wrapFailureMessageWith';
import { objectValidatorErrorMessage } from '../messages';
import validateFieldsWithValue from './validateFieldsWithValue';
import { ROOT_FIELD } from '../const';
import validateFieldsWithChildren from './validateFieldsWithChildren';
import validatorsWithMessages from '../defaults/validatorsWithMessages';

const { Failure } = Validation;

const objectErrorMessageWrapper = fieldName =>
  wrapFailureMessageWith(objectValidatorErrorMessage(fieldName));

const constraintsAreOwnConstraints = equals(CONSTRAINTS);

export const validateObject = curry((fieldName, constraints, o) => {
  const { fields, fieldsValidator } = constraints;

  const result = untilFailureValidator([
    validateObjectKeysWithConstraints(fieldsValidator, fields),
    validatorsWithMessages.validateObjectValues(buildValidatorsMap(fields)),
    applyDefaultsWithConstraints(fields),
    transformValuesWithConstraints(fields),
    validateFieldsWithValue(fields),
    validateFieldsWithChildren(fields),
  ])(o);
  return result.orElse(compose(objectErrorMessageWrapper(fieldName), Failure));
});

const validateObjectWithConstraints = curry((constraints, o) => {
  // Work around cyclical dependency between this file and constraints using
  // a late import.
  // eslint-disable-next-line global-require
  const validateConstraints = require(`./validateConstraints`).default;
  const objectValidation = validatorsWithMessages.validateIsObject(o);

  if (Failure.hasInstance(objectValidation)) {
    return objectErrorMessageWrapper(ROOT_FIELD)(objectValidation);
  }

  // If we try and validate our own constraint object with itself we enter an
  // infinite loop, so skip validation for our own constraints.
  return constraintsAreOwnConstraints(constraints)
    ? validateObject(ROOT_FIELD, constraints, o)
    : validateConstraints(constraints).matchWith({
        Success: always(validateObject(ROOT_FIELD, constraints, o)),
        Failure: identity,
      });
});

export default validateObjectWithConstraints;
