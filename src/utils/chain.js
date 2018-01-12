import { validation as Validation } from 'folktale';

const { Failure } = Validation;

export default (acc, f) =>
  acc.matchWith({
    Success: ({ value }) => f(value),
    Failure: ({ value }) => Failure(value),
  });
