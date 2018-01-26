import { replace, compose } from 'ramda';

const stripNewlinesAndTabs = compose(replace(/\s+/g, ` `));

expect.extend({
  toEqualWithoutWhitespace(received, argument) {
    const receivedWithoutWhitespace = stripNewlinesAndTabs(received);
    const argumentWithoutWhitespace = stripNewlinesAndTabs(argument);
    const pass = receivedWithoutWhitespace === argumentWithoutWhitespace;
    if (pass) {
      return {
        message: () =>
          `expected \n\n"${receivedWithoutWhitespace}" \n\nnot to equal \n\n"${argumentWithoutWhitespace}"`,
        pass,
      };
    }
    return {
      message: () =>
        `expected \n\n"${receivedWithoutWhitespace}" \n\nto equal \n\n"${argumentWithoutWhitespace}"`,
      pass,
    };
  },
});
