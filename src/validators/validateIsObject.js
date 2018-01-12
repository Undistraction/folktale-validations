import { isObj } from 'ramda-adjunct';
import typeValidator from '../helpers/typeValidator';

export default typeValidator(isObj, `Object`);
