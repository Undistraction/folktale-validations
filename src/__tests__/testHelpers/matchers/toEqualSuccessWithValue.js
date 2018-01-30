import { equals } from 'ramda';
import { validation as Validation } from 'folktale';
import { matcherHint, printReceived, printExpected } from 'jest-matcher-utils';
import diff from 'jest-diff';

const { Success } = Validation;

const name = `toEqualSuccessWithValue`;

export default (received, expected) => {
  const expectedAsSuccess = Success(expected);

  const pass = equals(
    JSON.stringify(received),
    JSON.stringify(expectedAsSuccess)
  );

  const message = pass
    ? () =>
        `${matcherHint(`.not.\${name}`)}\n\n` +
        `Expected value to not equal:\n` +
        `  ${printExpected(expectedAsSuccess)}\n` +
        `Received:\n` +
        `  ${printReceived(received)}`
    : () => {
        const diffString = diff(expectedAsSuccess, received);
        return (
          `${matcherHint(`.${name}`)}\n\n` +
          `Expected value to equal:\n` +
          `  ${printExpected(expectedAsSuccess)}\n` +
          `Received:\n` +
          `  ${printReceived(received)}${
            diffString ? `\n\nDifference:\n\n${diffString}` : ``
          }`
        );
      };
  // Passing the the actual and expected objects so that a custom reporter
  // could access them, for example in order to display a custom visual diff,
  // or create a different error message
  return {
    actual: received,
    expected,
    message,
    name,
    pass,
  };
};
