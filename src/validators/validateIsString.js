import { isString } from 'ramda-adjunct';
import typeValidator from '../helpers/typeValidator';

export default typeValidator(isString, `String`);
