import { contains } from 'ramda';
import { validation as Validation } from 'folktale';
import { joinWithComma } from '../utils';

const { Success, Failure } = Validation;

export default whitelist => o =>
  contains(o, whitelist)
    ? Success(o)
    : Failure([
        `Value wan't one of the accepted values: ${joinWithComma(whitelist)}`,
      ]);
