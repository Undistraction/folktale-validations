import { isArray } from 'ramda-adjunct';
import predicateValidator from '../helpers/predicateValidator';

export default message => predicateValidator(message, isArray);
