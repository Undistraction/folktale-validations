import sinon from 'sinon'
import transformValuesWithConstraints from '../../constraints/transformValuesWithConstraints'

describe(`transformValuesWithConstraints`, () => {
  it(`returns a Validation.Success with transformed values`, () => {
    const value1 = 1
    const value2 = 2
    const t1 = sinon.stub().returns(`t1 transformed ${value1}`)
    const t2 = sinon.stub().returns(`t2 transformed ${value2}`)
    const o = {
      a: value1,
      b: value2,
    }

    const constraints = [
      {
        name: `a`,
        transformer: t1,
        isRequired: true,
      },
      {
        name: `b`,
        transformer: t2,
        isRequired: true,
      },
    ]

    const validator = transformValuesWithConstraints(constraints)
    const validation = validator(o)
    expect(validation).toEqualSuccessWithValue({
      a: `t1 transformed ${value1}`,
      b: `t2 transformed ${value2}`,
    })
    expect(t1.calledWith(value1)).toBeTrue()
    expect(t2.calledWith(value2)).toBeTrue()
  })
})
