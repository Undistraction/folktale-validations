import { validation as Validation } from 'folktale';

const { Success, Failure } = Validation;

export default (errorMessage, predicate) => o =>
  predicate(o) ? Success(o) : Failure([errorMessage]);
