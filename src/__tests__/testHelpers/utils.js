import { equals } from 'ramda';
import { REPLACE_TOKEN } from './const';
import { deepReplace } from '../../utils/objects';

// eslint-disable-next-line import/prefer-default-export
export const replaceTokenWith = deepReplace(equals(REPLACE_TOKEN));
