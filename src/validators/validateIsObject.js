import { isPlainObj } from 'ramda-adjunct';
import typeValidator from '../helpers/typeValidator';
import { TYPES } from '../const';

export default typeValidator(isPlainObj, TYPES.Object);
