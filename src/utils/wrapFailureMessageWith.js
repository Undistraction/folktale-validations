import { validation as Validation } from 'folktale';
import { compose, of } from 'ramda';
import { propValue } from '../utils';

const { Failure } = Validation;

export default messageWrapper =>
  compose(Failure, of, messageWrapper, propValue);
