import { validation as Validation } from 'folktale';
import { prop, compose, of } from 'ramda';
import { propValue } from '../utils';

const { Failure } = Validation;

export default messageWrapper =>
  compose(Failure, of, messageWrapper, propValue);
