import { stub } from 'sinon'
import { always } from 'ramda'
import argumentsRenderer from '../../../failures/renderers/argumentsFailureRenderer'

describe(`arguments renderer`, () => {
  const prefix = `prefix`
  const messages = {
    invalidArgumentsPrefix: always(prefix),
  }
  const failureRenderer = stub().returns({ name: prefix })
  const renderer = argumentsRenderer(failureRenderer, messages)

  describe(`with a flat error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer({})
      expect(failureRenderer.calledWith({ name: prefix })).toBeTrue()
      expect(result).toEqual({ name: prefix })
    })
  })
})
