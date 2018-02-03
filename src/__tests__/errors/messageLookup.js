import { map } from 'ramda';
import {
  noMessageForKeyErrorMessage,
  messageValueMustBeFunction,
} from '../../errors';
import messageLookup from '../../errors/messageLookup';
import typeData from '../testHelpers/fixtures/typeData';
import { func } from '../testHelpers/fixtures';

describe(`messageLookup()`, () => {
  const invalidMessageKey = `invalidMessageKey`;

  it(`throws an error if there is no message for the supplied key`, () => {
    expect(() => messageLookup({})(invalidMessageKey)).toThrow(
      noMessageForKeyErrorMessage(invalidMessageKey)
    );
  });

  it(`throws an error if any of the message object keys are not functions`, () => {
    const key1 = `key1`;
    const key2 = `key2`;
    const key3 = `key3`;

    map(value => {
      const values = { [key1]: value, [key2]: func, [key3]: func };

      expect(() => messageLookup(values)).toThrow(
        messageValueMustBeFunction({ [key1]: value })
      );
    })(typeData.withoutFunctionValues);
  });

  it(`returns the resolved message if a function exists for the supplied key`, () => {
    expect(() => messageLookup({})(invalidMessageKey)).toThrow(
      noMessageForKeyErrorMessage(invalidMessageKey)
    );
  });
});
