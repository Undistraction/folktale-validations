import { reduce } from 'ramda';
import { orErrorMessages } from '../messages';

export default validators => o =>
  reduce(
    (accumulatedValidation, validator) =>
      !accumulatedValidation
        ? validator(o)
        : accumulatedValidation.orElse(errorMessage1 =>
            validator(o).mapFailure(errorMessage2 => [
              orErrorMessages([errorMessage1, errorMessage2]),
            ])
          ),
    null
  )(validators);
