import predicateValidator from './predicateValidator';
import { typeErrorMessage } from '../messages';

export default (predicate, typeName, complement = false) =>
  predicateValidator(typeErrorMessage(typeName, complement), predicate);
