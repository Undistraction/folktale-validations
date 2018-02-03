import { validation as Validation } from 'folktale';
import { reduce } from 'ramda';
import { chain } from '../utils/validations';

const { Success } = Validation;

export default validators => o => reduce(chain, Success(o), validators);
