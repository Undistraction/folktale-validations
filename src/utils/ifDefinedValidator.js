import orValidator from './orValidator';
import validateIsUndefined from '../validators/validateIsUndefined';

export default validator => o => orValidator(validateIsUndefined, validator)(o);
