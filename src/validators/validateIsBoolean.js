import { isBoolean } from 'ramda-adjunct';
import typeValidator from '../helpers/typeValidator';

export default typeValidator(isBoolean, `Boolean`);
