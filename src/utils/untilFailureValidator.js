import { validation as Validation } from 'folktale';
import { reduce } from 'ramda';

const { Success } = Validation;

export default validators => o =>
  reduce(
    (acc, value) => (Success.hasInstance(acc) ? acc.concat(value(o)) : acc),
    Success(),
    validators
  );
