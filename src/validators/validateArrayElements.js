import { validation as Validation } from 'folktale';
import { reduce, always, curry } from 'ramda';

import wrapFailureMessageWith from '../utils/wrapFailureMessageWith';

const { Success, Failure } = Validation;

const validateAllWith = (elementMessage, validator) => o =>
  reduce(
    (acc, element) =>
      acc.concat(
        validator(element).orElse(message =>
          Failure([elementMessage(element, message)])
        )
      ),
    Success(),
    o
  );

export default curry((elementsMessage, elementMessage, validator) => o => {
  const v = validateAllWith(elementMessage, validator);
  const validation = v(o);
  return validation.matchWith({
    Success: always(Success(o)),
    Failure: wrapFailureMessageWith(elementsMessage),
  });
});
