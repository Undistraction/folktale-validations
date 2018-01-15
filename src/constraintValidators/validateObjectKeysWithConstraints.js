import untilFailureValidator from '../helpers/untilFailureValidator';
import validateWhitelistedKeys from '../validators/validateWhitelistedKeys';
import validateRequiredKeys from '../validators/validateRequiredKeys';

import { pluckName, requiredKeys } from './utils';

export default constraints =>
  untilFailureValidator([
    validateWhitelistedKeys(pluckName(constraints)),
    validateRequiredKeys(requiredKeys(constraints)),
  ]);
