import { prepend, curry, juxt, compose } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateWhitelistedKeys from '../validators/validateWhitelistedKeys';
import validateRequiredKeys from '../validators/validateRequiredKeys';

import { pluckName, requiredKeys } from './utils';

export default curry((fieldsValidator, constraints) => {
  let validators = juxt([
    compose(validateWhitelistedKeys, pluckName),
    compose(validateRequiredKeys, requiredKeys),
  ])(constraints);
  if (fieldsValidator) {
    validators = prepend(fieldsValidator, validators);
  }
  return untilFailureValidator(validators);
});
