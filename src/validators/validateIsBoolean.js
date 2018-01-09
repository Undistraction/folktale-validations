import { isBoolean } from 'ramda-adjunct';
import typeValidator from '../utils/typeValidator';

export default typeValidator(isBoolean, `Boolean`);
