import { isArray } from 'ramda-adjunct';
import typeValidator from '../helpers/typeValidator';

export default typeValidator(isArray, `Array`);
