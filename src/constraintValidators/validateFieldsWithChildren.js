import { append, reduce, concat, isEmpty } from 'ramda';
import { isNotEmpty } from 'ramda-adjunct';
import { validation as Validation } from 'folktale';
import { constraintsForFieldsWithPropChildren } from './utils';
import { validateObject } from './validateObjectWithConstraints';

const { collect, Success } = Validation;

// Run through all the
const validateChildrenOfField = childConstraints =>
  reduce((acc, child) => {
    if (isEmpty(child)) {
      return acc;
    }
    // eslint-disable-next-line no-use-before-define
    return append(validateObject(childConstraints, child), acc);
  }, []);

// Run through each field that has children
const validateChildren = reduce(
  // eslint-disable-next-line no-unused-vars
  (acc, [fieldName, fieldValue, childConstraints]) => {
    // console.log(`Validating children Of`, fieldName);
    const childValidations = validateChildrenOfField(childConstraints)(
      fieldValue
    );
    return isNotEmpty(childValidations) ? concat(childValidations, acc) : acc;
  },
  []
);

export default constraints => o => {
  const fieldsWithChildrenConstraints = constraintsForFieldsWithPropChildren(
    constraints
  )(o);
  const childValidations = validateChildren(fieldsWithChildrenConstraints);

  if (isNotEmpty(childValidations)) {
    return collect(childValidations);
  }
  return Success(o);
};
