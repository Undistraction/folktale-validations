import { join, compose, map } from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const joinWithComma = join(`, `);
export const joinWithAnd = join(` and `);
export const joinWithOr = join(` or `);
export const quote = value => `'${value}'`;
export const quoteAndJoinWithComma = compose(joinWithComma, map(quote));
