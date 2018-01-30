import { equals } from 'ramda';
import { matcherHint, printReceived } from 'jest-matcher-utils';
import diff from 'jest-diff';

const name = `toBeFalse`;

export default received => {
  const pass = equals(received, false);

  const message = pass
    ? () =>
        `${matcherHint(`.not.\${name}`)}\n\n` +
        `Expected value to be 'false':\n` +
        `Received:\n` +
        `  ${printReceived(received)}`
    : () => {
        const diffString = diff(false, received);
        return (
          `${matcherHint(`.${name}`)}\n\n` +
          `Expected value to be 'false':\n` +
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
    expected: false,
    message,
    name,
    pass,
  };
};
