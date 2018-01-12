import { isNumberWithUnit } from 'cssjs-units';
import predicateValidator from './predicateValidator';
import { numberWithUnitErrorMessage } from '../messages';

// Create a type validator
export default unit =>
  predicateValidator(
    isNumberWithUnit([unit]),
    numberWithUnitErrorMessage(unit)
  );
