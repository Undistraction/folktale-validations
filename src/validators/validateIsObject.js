import { isObj } from 'ramda-adjunct';
import typeValidator from '../helpers/typeValidator';
import { TYPES } from '../const';

export default typeValidator(isObj, TYPES.Object);
