import { isUndefined } from 'ramda-adjunct';
import typeValidator from '../helpers/typeValidator';

export default typeValidator(isUndefined, `Undefined`);
