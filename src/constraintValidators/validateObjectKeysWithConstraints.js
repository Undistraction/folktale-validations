import { prepend, curry, juxt, compose } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import configuredValidators from '../configuredValidators';

import { pluckName, requiredKeys } from './utils';

export default curry((fieldsValidator, constraints) => {
  let validators = juxt([
    compose(configuredValidators.validateWhitelistedKeys, pluckName),
    compose(configuredValidators.validateRequiredKeys, requiredKeys),
  ])(constraints);
  if (fieldsValidator) {
    validators = prepend(fieldsValidator, validators);
  }
  return untilFailureValidator(validators);
});
