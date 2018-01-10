import { joinWithAnd } from '../utils';

const or = (validation1, validation2) =>
  validation1.orElse(value1 =>
    validation2.mapFailure(value2 => [joinWithAnd([value1, value2])])
  );

export default validators => o =>
  validators.map(validator => validator(o)).reduce(or);
