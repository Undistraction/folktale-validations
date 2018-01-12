import predicateValidator from './predicateValidator';
import { typeErrorMessage } from '../messages';

export default (predicate, typeName) =>
  predicateValidator(predicate, typeErrorMessage(typeName));
