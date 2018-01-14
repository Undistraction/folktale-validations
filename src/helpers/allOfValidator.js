import { compose, map, when } from 'ramda';
import { isArray } from 'ramda-adjunct';

import { collect, Failure } from 'folktale/validation';
import { orErrorMessages } from '../../lib/messages';

export default validators => o =>
  compose(collect, map(validator => validator(o)))(validators).orElse(message =>
    Failure(when(isArray, orErrorMessages)(message))
  );
