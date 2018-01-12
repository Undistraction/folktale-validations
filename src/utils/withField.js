import { validation as Validation } from 'folktale';
import { fieldErrorMessage } from '../messages';

const { Failure } = Validation;

export default (field, validation) =>
  validation.orElse(message => Failure(fieldErrorMessage(field, message)));
