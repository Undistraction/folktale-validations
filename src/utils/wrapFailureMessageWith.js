import { validation as Validation } from 'folktale';
import { prop, compose, of } from 'ramda';

const { Failure } = Validation;

export default messageWrapper =>
  compose(Failure, of, messageWrapper, prop(`value`));
