import { isString } from 'ramda-adjunct';
import predicateValidator from '../helpers/predicateValidator';

export default message => predicateValidator(message, isString);
