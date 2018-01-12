import anyOfValidator from './anyOfValidator';

export default (validator1, validator2) => o =>
  anyOfValidator([validator1, validator2])(o);
