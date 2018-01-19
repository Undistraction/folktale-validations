import { prepend, curry } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateWhitelistedKeys from '../validators/validateWhitelistedKeys';
import validateRequiredKeys from '../validators/validateRequiredKeys';

import { pluckName, requiredKeys } from './utils';

export default curry((fieldsValidator, constraints) => {
  let validators = [
    validateWhitelistedKeys(pluckName(constraints)),
    validateRequiredKeys(requiredKeys(constraints)),
  ];
  if (fieldsValidator) {
    validators = prepend(fieldsValidator, validators);
  }
  return v => {
    const r = untilFailureValidator(validators)(v);
    return r;
  };
});
