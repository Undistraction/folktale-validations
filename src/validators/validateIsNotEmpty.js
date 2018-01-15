import { isNotEmpty } from 'ramda-adjunct';
import { isEmptyErrorMessage } from '../messages';
import predicateValidator from '../helpers/predicateValidator';

export default predicateValidator(isNotEmpty, isEmptyErrorMessage());
