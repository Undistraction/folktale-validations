import { isNumberWithUnit } from 'js-css-units';
import predicateValidator from './predicateValidator';

// Create a type validator
export default unit =>
  predicateValidator(
    isNumberWithUnit([unit]),
    `Wasn't number with unit: '${unit}'`
  );
