import { validation as Validation } from 'folktale';
import { reduce, identity, assoc, values, isEmpty } from 'ramda';
import {
  constraintsForFieldsWithPropValue,
  replaceFieldsWithValidationValues,
} from '../utils';

const { collect, Success } = Validation;

const validateValues = validateObject =>
  reduce(
    (acc, [fieldName, fieldValue, childConstraints]) =>
      assoc(
        fieldName,
        validateObject(fieldName, childConstraints, fieldValue),
        acc
      ),
    {}
  );

export default (validateObject, constraints) => o => {
  const fieldsWithPropConstraints = constraintsForFieldsWithPropValue(
    constraints
  )(o);

  const childValidations = validateValues(validateObject)(
    fieldsWithPropConstraints
  );
  if (isEmpty(childValidations)) {
    return Success(o);
  }
  return collect(values(childValidations)).matchWith({
    Success: _ =>
      Success(replaceFieldsWithValidationValues(childValidations, o)),
    Failure: identity,
  });
};
