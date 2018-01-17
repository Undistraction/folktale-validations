import allOfValidator from './allOfValidator';

export default (validator1, validator2) => o =>
  allOfValidator([validator1, validator2])(o);
