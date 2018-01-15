import validateObjectWithConstraints from './validateObjectKeysWithConstraints';
import CONSTRAINTS from '../constraints';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateIsObject from '../validators/validateIsObject';
import validateIsArrayOf from '../validators/validateIsArrayOf';
import validateIsNotEmpty from '../validators/validateIsNotEmpty';
import validateIsArray from '../validators/validateIsArray';

export default untilFailureValidator([
  validateIsArray,
  validateIsNotEmpty,
  validateIsArrayOf(
    untilFailureValidator([
      validateIsObject,
      validateObjectWithConstraints(CONSTRAINTS),
    ])
  ),
]);
