import { identity } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateObjectKeysWithConstraints from './validateObjectKeysWithConstraints';
import validateValues from '../validators/validateValues';
import validateConstraints from './validateConstraints';
import transformValuesWithConstraints from './transformValuesWithConstraints';
import { validatorsMap } from './utils';

export default constraints => o =>
  validateConstraints(constraints).matchWith({
    Success: _ =>
      untilFailureValidator([
        validateObjectKeysWithConstraints(constraints),
        validateValues(validatorsMap(constraints)),
        transformValuesWithConstraints(constraints),
      ])(o),
    Failure: identity,
  });
