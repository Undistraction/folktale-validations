import { contains } from 'ramda';
import { validation as Validation } from 'folktale';
import { whitelistErrorMessage } from '../messages';

const { Success, Failure } = Validation;

export default whitelist => o =>
  contains(o, whitelist)
    ? Success(o)
    : Failure([whitelistErrorMessage(whitelist)]);
