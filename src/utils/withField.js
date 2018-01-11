import { validation as Validation } from 'folktale';
import { toFieldErrorMessage } from '../utils';

const { Failure } = Validation;

export default (field, validation) =>
  validation.orElse(message => Failure(toFieldErrorMessage(field, message)));
