import { isPlainObj } from 'ramda-adjunct';
import predicateValidator from '../helpers/predicateValidator';

export default message => predicateValidator(message, isPlainObj);
