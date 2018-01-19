import { isNotEmpty } from 'ramda-adjunct';
import { validation as Validation } from 'folktale';
import { reduce, append } from 'ramda';
import { validateObject } from './validateObjectWithConstraints';
import { constraintsForFieldsWithPropValue } from './utils';

const { collect, Success } = Validation;

const validateValues = reduce(
  // eslint-disable-next-line no-unused-vars
  (acc, [fieldName, fieldValue, childConstraints]) =>
    isNotEmpty(fieldValue)
      ? // eslint-disable-next-line no-use-before-define
        append(validateObject(childConstraints, fieldValue), acc)
      : acc,
  []
);

export default constraints => o => {
  const fieldsWithPropConstraints = constraintsForFieldsWithPropValue(
    constraints
  )(o);

  const childValidations = validateValues(fieldsWithPropConstraints);
  return isNotEmpty(childValidations) ? collect(childValidations) : Success(o);
};
