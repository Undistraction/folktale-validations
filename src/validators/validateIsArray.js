import { isArray } from 'ramda-adjunct';
import typeValidator from '../utils/typeValidator';

export default typeValidator(isArray, `Array`);
