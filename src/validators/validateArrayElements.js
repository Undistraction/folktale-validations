import { validation as Validation } from 'folktale';
import { reduce, always } from 'ramda';
import {
  arrayElementsErrorMessage,
  arrayElementErrorMessage,
} from '../messages';
import wrapFailureMessageWith from '../utils/wrapFailureMessageWith';

const { Success, Failure } = Validation;

const validateAllWith = validator => o =>
  reduce(
    (acc, element) =>
      acc.concat(
        validator(element).orElse(message =>
          Failure([arrayElementErrorMessage(element, message)])
        )
      ),
    Success(),
    o
  );

export default validator => o => {
  const v = validateAllWith(validator);
  const validation = v(o);
  return validation.matchWith({
    Success: always(Success(o)),
    Failure: wrapFailureMessageWith(arrayElementsErrorMessage),
  });
};
