import { prepend, curry } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateWhitelistedKeys from '../validators/validateWhitelistedKeys';
import validateRequiredKeys from '../validators/validateRequiredKeys';

import { pluckName, requiredKeys } from './utils';

export default curry((fieldValidator, constraints) => {
  let validators = [
    validateWhitelistedKeys(pluckName(constraints)),
    validateRequiredKeys(requiredKeys(constraints)),
  ];
  if (fieldValidator) {
    validators = prepend(fieldValidator, validators);
  }
  return v => {
    const r = untilFailureValidator(validators)(v);
    return r;
  };
});
