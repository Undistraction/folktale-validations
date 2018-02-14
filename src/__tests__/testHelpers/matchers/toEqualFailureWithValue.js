import { validation as Validation } from 'folktale'
import { matcherHint, printReceived, printExpected } from 'jest-matcher-utils'
import diff from 'jest-diff'
import deepEql from 'deep-eql'
import { isFailure } from '../../../utils/validations'

const { Failure } = Validation

const name = `toEqualFailureWithValue`

export default (received, expected) => {
  const expectedAsFailure = Failure(expected)

  const pass = isFailure(received) && deepEql(received.value, expected)

  const message = pass
    ? () =>
        `${matcherHint(`.not.\${name}`)}\n\n` +
        `Expected value to not equal:\n` +
        `  ${printExpected(expectedAsFailure)}\n` +
        `Received:\n` +
        `  ${printReceived(received)}`
    : () => {
        const diffString = diff(expectedAsFailure, received)
        return (
          `${matcherHint(`.${name}`)}\n\n` +
          `Expected value to equal:\n` +
          `  ${printExpected(expectedAsFailure)}\n` +
          `Received:\n` +
          `  ${printReceived(received)}${
            diffString ? `\n\nDifference:\n\n${diffString}` : ``
          }`
        )
      }
  // Passing the the actual and expected objects so that a custom reporter
  // could access them, for example in order to display a custom visual diff,
  // or create a different error message
  return {
    actual: received,
    expected,
    message,
    name,
    pass,
  }
}
