import { curry } from 'ramda';
import untilFailureValidator from '../helpers/untilFailureValidator';
import validateIsArray from '../validators/validateIsArray';
import validateArrayElements from '../validators/validateArrayElements';

export default curry(
  (isArrayMessage, elementsMessage, elementMessage, validator) =>
    untilFailureValidator([
      validateIsArray(isArrayMessage),
      validateArrayElements(elementsMessage, elementMessage, validator),
    ])
);
