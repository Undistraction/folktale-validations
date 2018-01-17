import { prepend, curry } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateWhitelistedKeys from '../validators/validateWhitelistedKeys';
import validateRequiredKeys from '../validators/validateRequiredKeys';

import { pluckName, requiredKeys } from './utils';

export default curry((validator, constraints) => {
  let validators = [
    validateWhitelistedKeys(pluckName(constraints)),
    validateRequiredKeys(requiredKeys(constraints)),
  ];
  if (validator) {
    validators = prepend(validator, validators);
  }
  return untilFailureValidator(validators);
});
