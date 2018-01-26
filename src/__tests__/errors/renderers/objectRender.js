import renderMessage from '../../../errors/renderers/objectRenderer';
import {
  flatErrorMessage,
  nestedErrorMessage,
} from '../../testHelpers/fixtures';
// eslint-disable-next-line no-unused-vars
import toEqualWithoutWhitespace from '../../testHelpers/matchers/toEqualWithoutWhitespace';

describe(`objectRenderer()`, () => {
  describe(`with a flat error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderMessage(flatErrorMessage);
      expect(result).toEqualWithoutWhitespace(
        `Object included invalid value(s)
          – Key 'a': errorMessageForA
          – Key 'b': errorMessageForB
          – Key 'c': errorMessageForC`
      );
    });
  });

  describe(`with a nested error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderMessage(nestedErrorMessage);
      expect(result).toEqualWithoutWhitespace(
        `Object included invalid value(s)
          – Key 'a': errorMessageForA
          – Key 'b': Object included invalid value(s)
            – Key 'c': errorMessageForC`
      );
    });
  });
});
