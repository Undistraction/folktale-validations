import { prepend, curry, juxt, compose } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validatorsWithMessages from '../defaults/validatorsWithMessages';

import { pluckName, requiredKeys } from './utils';

export default curry((fieldsValidator, constraints) => {
  let validators = juxt([
    compose(validatorsWithMessages.validateWhitelistedKeys, pluckName),
    compose(validatorsWithMessages.validateRequiredKeys, requiredKeys),
  ])(constraints);
  if (fieldsValidator) {
    validators = prepend(fieldsValidator, validators);
  }
  return untilFailureValidator(validators);
});
