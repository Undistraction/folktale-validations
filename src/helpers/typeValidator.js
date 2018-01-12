import predicateValidator from './predicateValidator';

export default (predicate, typeName) =>
  predicateValidator(predicate, `Wasn't type: '${typeName}'`);
