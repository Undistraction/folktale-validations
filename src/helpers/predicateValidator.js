import { validation as Validation } from 'folktale';

const { Success, Failure } = Validation;

export default (predicate, errorMessage) => o =>
  predicate(o) ? Success(o) : Failure([errorMessage]);
