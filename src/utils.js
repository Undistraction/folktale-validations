import { join, compose, map, append, flip, curry, tap } from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const joinWithComma = join(`, `);
export const joinWithAnd = join(` and `);
export const joinWithOr = join(` or `);
export const joinWitColon = join(`: `);
export const quote = value => `'${value}'`;
export const quoteAndJoinWithComma = compose(joinWithComma, map(quote));

const log = curry((loggingFunction, prefix) =>
  tap(
    compose(loggingFunction, join(`: `), flip(append)([prefix]), JSON.stringify)
  )
);

// eslint-disable-next-line no-console
export const logToConsole = log(console.log);
