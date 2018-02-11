import { stub } from 'sinon'
import { always } from 'ramda'
import argumentsRenderer from '../../../failures/renderers/argumentsRenderer'

describe(`arguments renderer`, () => {
  const prefix = `prefix`
  const messages = {
    invalidArgumentsPrefix: always(prefix),
  }
  const defaultRenderer = stub().returns({ name: prefix })
  const renderer = argumentsRenderer(defaultRenderer, messages)

  describe(`with a flat error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer({})
      expect(defaultRenderer.calledWith({ name: prefix })).toBeTrue()
      expect(result).toEqual({ name: prefix })
    })
  })
})
