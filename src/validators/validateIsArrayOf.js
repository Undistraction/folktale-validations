import untilFailureValidator from '../helpers/untilFailureValidator';
import validateIsArray from '../validators/validateIsArray';
import validateArrayElements from '../validators/validateArrayElements';

export default validator =>
  untilFailureValidator([validateIsArray, validateArrayElements(validator)]);
