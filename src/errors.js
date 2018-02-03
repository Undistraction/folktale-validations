import { map, compose, toPairs } from 'ramda';
import { joinWithColon, joinWithComma, logToConsole } from './utils';

export const throwError = message => {
  throw new Error(message);
};

export const noMessageForKeyErrorMessage = key => `No message for key '${key}`;
export const messageValueMustBeFunction = kvPairs =>
  `All values must be functions but You supplied an object with invalid values: ${compose(
    joinWithComma,
    logToConsole(`3 ??`),
    map(joinWithColon),
    logToConsole(`2 ??`),
    toPairs,
    map(toString),
    logToConsole(`1 ??`)
  )(kvPairs)}`;
