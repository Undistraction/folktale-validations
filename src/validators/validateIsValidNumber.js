import { isValidNumber } from 'ramda-adjunct';
import predicateValidator from '../helpers/predicateValidator';

export default predicateValidator(isValidNumber, `Wasn't a valid Number`);
