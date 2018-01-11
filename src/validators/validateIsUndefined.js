import { isUndefined } from 'ramda-adjunct';
import typeValidator from '../utils/typeValidator';

export default typeValidator(isUndefined, `Undefined`);
