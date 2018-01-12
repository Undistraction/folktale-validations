import { validation as Validation } from 'folktale';
import { reduce } from 'ramda';
import {
  arrayElementsErrorMessage,
  arrayElementErrorMessage,
} from '../messages';

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
    Success: _ => Success(o),
    Failure: ({ value }) => Failure([arrayElementsErrorMessage(value)]),
  });
};
