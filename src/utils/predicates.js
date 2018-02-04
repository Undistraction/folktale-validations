import { either, allPass } from 'ramda';
import { isArray, isObj, isNotDate } from 'ramda-adjunct';

export const isNotRegex = v => !(v instanceof RegExp);
export const isVanillaObj = allPass([isObj, isNotRegex, isNotDate]);

export const isVanillaObjectOrArray = either(isVanillaObj, isArray);
