import { reduce, concat, isEmpty, identity } from 'ramda';
import { isNotEmpty } from 'ramda-adjunct';
import { validation as Validation } from 'folktale';
import { constraintsForFieldsWithPropChildren } from './utils';
import { validateObject } from './validateObjectWithConstraints';

const { collect, Success } = Validation;

const replaceArrayItemsWithValidationValues = (o, replacements) => {
  for (const [key, validation] of replacements) {
    o[key] = validation.value;
  }
  return o;
};

const replaceChildren = (childrenMap, o) => {
  for (const [key, value] of childrenMap) {
    o[key] = replaceArrayItemsWithValidationValues(o[key], value);
  }
  return o;
};

// Run through all the
const validateChildrenOfField = childConstraints => fieldName => {
  let index = -1;
  return reduce((acc, child) => {
    index += 1;
    if (isEmpty(child)) {
      return acc;
    }
    // eslint-disable-next-line no-use-before-define
    acc.set(index, validateObject(fieldName, childConstraints, child));
    return acc;
  }, new Map());
};

// { alpha: Success, beta: Success}

// Run through each field that has children
const validateChildren = v =>
  reduce((acc, [fieldName, fieldValue, childConstraints]) => {
    const childValidations = validateChildrenOfField(childConstraints)(
      fieldName
    )(fieldValue);
    if (isNotEmpty(childValidations)) {
      acc.set(fieldName, childValidations);
    }
    return acc;
  }, new Map())(v);

// [
//    { alpha: Success, beta: Success},
//    { charlie: Success, delta: Success}
// [

export default constraints => o => {
  const fieldsWithChildrenConstraints = constraintsForFieldsWithPropChildren(
    constraints
  )(o);
  const childValidations = validateChildren(fieldsWithChildrenConstraints);
  let allValidations = [];
  for (const [key, set] of childValidations) {
    const a = [];
    for (const value of set) {
      a.push(value[1]);
    }
    allValidations = concat(a, allValidations);
  }

  if (isEmpty(childValidations)) {
    return Success(o);
  }

  return collect(allValidations).matchWith({
    Success: _ => {
      const replacedO = replaceChildren(childValidations, o);
      return Success(replacedO);
    },
    Failure: identity,
  });
};
