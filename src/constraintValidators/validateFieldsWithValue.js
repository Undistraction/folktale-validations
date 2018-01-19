import { validation as Validation } from 'folktale';
import { reduce, identity, assoc, values, isEmpty } from 'ramda';
import { validateObject } from './validateObjectWithConstraints';
import {
  constraintsForFieldsWithPropValue,
  replaceFieldsWithValidationValues,
} from './utils';

const { collect, Success } = Validation;

const validateValues = reduce(
  (acc, [fieldName, fieldValue, childConstraints]) =>
    assoc(
      fieldName,
      validateObject(fieldName, childConstraints, fieldValue),
      acc
    ),
  {}
);

export default constraints => o => {
  const fieldsWithPropConstraints = constraintsForFieldsWithPropValue(
    constraints
  )(o);

  const childValidations = validateValues(fieldsWithPropConstraints);
  if (isEmpty(childValidations)) {
    return Success(o);
  }
  return collect(values(childValidations)).matchWith({
    Success: _ =>
      Success(replaceFieldsWithValidationValues(childValidations, o)),
    Failure: identity,
  });
};
