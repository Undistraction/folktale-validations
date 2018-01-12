import { reduce } from 'ramda';
import { joinWithAnd } from '../utils';

export default validators => o =>
  reduce(
    (accumulatedValidation, validator) =>
      !accumulatedValidation
        ? validator(o)
        : accumulatedValidation.orElse(errorMessage1 =>
            validator(o).mapFailure(errorMessage2 => [
              joinWithAnd([errorMessage1, errorMessage2]),
            ])
          ),
    null
  )(validators);
