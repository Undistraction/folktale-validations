import { joinWithAnd, wrapWithSoftBrackets } from '../../../utils/formatting'
import andRenderer from '../../../failures/renderers/andOrRenderer'
import { joinWithOr } from '../../../utils/formatting'

describe(`andRenderer`, () => {
  const validatorId1 = `valiatorId1`
  const validatorId2 = `valiatorId2`
  const validatorId3 = `valiatorId3`
  const validatorId4 = `valiatorId4`
  const validatorId5 = `valiatorId5`
  const validatorId6 = `valiatorId6`
  const validatorId7 = `valiatorId7`
  const validatorId8 = `valiatorId8`

  const messages = {
    joinWithAnd,
    joinWithOr,
    group: wrapWithSoftBrackets,
  }

  it(`renders an 'and' correctly`, () => {
    const value = {
      and: [validatorId1, validatorId2, validatorId3],
    }

    const expected = `${validatorId1} and ${validatorId2} and ${validatorId3}`

    const renderer = andRenderer(messages)
    const rendered = renderer(value)

    expect(rendered).toEqual(expected)
  })

  it(`renders an 'or' correctly`, () => {
    const value = {
      or: [validatorId1, validatorId2, validatorId3],
    }

    const expected = `${validatorId1} or ${validatorId2} or ${validatorId3}`

    const renderer = andRenderer(messages)
    const rendered = renderer(value)

    expect(rendered).toEqual(expected)
  })

  it(`renders a nested 'ands' correctly`, () => {
    const value = {
      and: [
        validatorId1,
        validatorId2,
        {
          and: [
            validatorId3,
            {
              and: [validatorId4, validatorId5],
            },
          ],
        },
        validatorId6,
        {
          and: [validatorId7, validatorId8],
        },
      ],
    }

    const expected = `${validatorId1} and ${validatorId2} and (${validatorId3} and (${validatorId4} and ${validatorId5})) and ${validatorId6} and (${validatorId7} and ${validatorId8})`

    const renderer = andRenderer(messages)
    const rendered = renderer(value)

    expect(rendered).toEqual(expected)
  })
})
