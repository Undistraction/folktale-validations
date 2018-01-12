import { isValidNumber } from 'ramda-adjunct';
import predicateValidator from '../helpers/predicateValidator';
import { validNumberErrorMessage } from '../messages';

export default predicateValidator(isValidNumber, validNumberErrorMessage());
