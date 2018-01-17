import { identity } from 'ramda';
import applySuccessValueTo from './applySuccessValueTo';

export default (acc, f) =>
  acc.matchWith({
    Success: applySuccessValueTo(f),
    Failure: identity,
  });
