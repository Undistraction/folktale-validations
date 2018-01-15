import untilFailureValidator from '../helpers/untilFailureValidator';
import validateObjectKeysWithConstraints from './validateObjectKeysWithConstraints';
import validateObjectValuesWithConstraints from './validateObjectValuesWithConstraints';

export default constraints =>
  untilFailureValidator([
    validateObjectKeysWithConstraints(constraints),
    validateObjectValuesWithConstraints(constraints),
  ]);
