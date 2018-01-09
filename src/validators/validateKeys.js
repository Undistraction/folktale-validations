import { without, compose, keys, isEmpty } from 'ramda';
import { validation as Validation } from 'folktale';
import { joinWithComma } from '../utils';

const { Success, Failure } = Validation;

export default items => o => {
  const withoutValidKeys = without(items);
  const collectInvalidKeys = compose(withoutValidKeys, keys);
  const invalidKeys = collectInvalidKeys(o);
  return isEmpty(invalidKeys)
    ? Success(o)
    : Failure([
        `Object included invalid keys: '[${joinWithComma(invalidKeys)}]'`,
      ]);
};
