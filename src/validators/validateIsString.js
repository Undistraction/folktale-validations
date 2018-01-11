import { isString } from 'ramda-adjunct';
import typeValidator from '../utils/typeValidator';

export default typeValidator(isString, `String`);
