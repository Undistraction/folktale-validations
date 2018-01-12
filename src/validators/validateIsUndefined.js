import { isUndefined } from 'ramda-adjunct';
import { TYPES } from '../const';
import typeValidator from '../helpers/typeValidator';

export default typeValidator(isUndefined, TYPES.Undefined);
