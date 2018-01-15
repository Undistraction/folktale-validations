import { isNotUndefined } from 'ramda-adjunct';
import { TYPES } from '../const';
import typeValidator from '../helpers/typeValidator';

export default typeValidator(isNotUndefined, TYPES.Undefined, true);
