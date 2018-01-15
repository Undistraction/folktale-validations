import { identity } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateObjectKeysWithConstraints from './validateObjectKeysWithConstraints';
import validateObjectValuesWithConstraints from './validateObjectValuesWithConstraints';
import validateConstraints from './validateConstraints';

export default constraints => o =>
  validateConstraints(constraints).matchWith({
    Success: _ =>
      untilFailureValidator([
        validateObjectKeysWithConstraints(constraints),
        validateObjectValuesWithConstraints(constraints),
      ])(o),
    Failure: identity,
  });
