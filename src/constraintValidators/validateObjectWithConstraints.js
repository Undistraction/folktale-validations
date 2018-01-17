import { identity, always } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateObjectKeysWithConstraints from './validateObjectKeysWithConstraints';
import validateObjectValues from '../validators/validateObjectValues';
import applyDefaultsWithConstraints from './applyDefaultsWithConstraints';
import transformValuesWithConstraints from './transformValuesWithConstraints';
import { validatorsMap } from './utils';
import CONSTRAINTS from '../constraints';

export default constraints => o => {
  // Work around cyclical dependency between this file and constraints using
  // a late import.
  // eslint-disable-next-line global-require
  const validateConstraints = require(`./validateConstraints`).default;
  const validators = [
    validateObjectKeysWithConstraints(
      constraints.fieldsValidator,
      constraints.fields
    ),
    validateObjectValues(validatorsMap(constraints.fields)),
    // Trigger validation of value if field of `value`
    // Trigger validation of children if field of `children`.
    applyDefaultsWithConstraints(constraints.fields),
    transformValuesWithConstraints(constraints.fields),
  ];

  const validateObject = untilFailureValidator(validators);

  // Avoid recursion where we are validating CONSTRAINTS with CONSTRAINTS
  if (constraints === CONSTRAINTS) {
    return validateObject(o);
  }

  return validateConstraints(constraints).matchWith({
    Success: always(validateObject(o)),
    Failure: identity,
  });
};
