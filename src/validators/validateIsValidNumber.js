import { isValidNumber } from 'ramda-adjunct';
import predicateValidator from '../utils/predicateValidator';

export default predicateValidator(isValidNumber, `Wasn't a valid Number`);
