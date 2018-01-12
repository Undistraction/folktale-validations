import { validation as Validation } from 'folktale';
import { fieldErrorMessage } from '../messages';

const { Failure } = Validation;

export default (field, validator) => o =>
  validator(o).orElse(message => Failure(fieldErrorMessage(field, message)));
