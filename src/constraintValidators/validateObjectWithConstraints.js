import { identity } from 'ramda';
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

  if (constraints === CONSTRAINTS) {
    const r = untilFailureValidator([
      validateObjectKeysWithConstraints(
        constraints.validator,
        constraints.fields
      ),
      validateObjectValues(validatorsMap(constraints.fields)),
      applyDefaultsWithConstraints(constraints.fields),
      transformValuesWithConstraints(constraints.fields),
    ])(o);
    return r;
  }

  const s = validateConstraints(constraints).matchWith({
    Success: _ =>
      untilFailureValidator([
        validateObjectKeysWithConstraints(
          constraints.validator,
          constraints.fields
        ),
        validateObjectValues(validatorsMap(constraints.fields)),
        applyDefaultsWithConstraints(constraints.fields),
        transformValuesWithConstraints(constraints.fields),
      ])(o),
    Failure: identity,
  });
  return s;
};
