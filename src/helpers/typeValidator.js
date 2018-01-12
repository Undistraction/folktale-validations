import predicateValidator from './predicateValidator';

// Create a type validator
export default (predicate, typeName) =>
  predicateValidator(predicate, `Wasn't type: '${typeName}'`);
