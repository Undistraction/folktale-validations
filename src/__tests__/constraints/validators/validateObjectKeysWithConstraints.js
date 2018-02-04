import { validation as Validation } from 'folktale'
import { validateObjectKeysWithConstraints } from '../../../index'
import {
  spy,
  stubReturnsSuccess,
  stubReturnsFailure,
} from '../../testHelpers/sinon'

const { Success, Failure } = Validation

describe.skip(`validateObjectKeysWithConstraints()`, () => {
  describe(`object without key with value`, () => {
    describe(`with keys not on whitelist`, () => {
      it(`returns a Validation.Failure with a message for invalid keys`, () => {
        const value = { a: 1, b: 2 }
        const validator = validateObjectKeysWithConstraints([])
        const validation = validator(value)
        expect(validation).toEqual(
          Failure([`Object included invalid key(s): '[a, b]'`])
        )
      })
    })

    describe(`with constraints`, () => {
      describe(`satisfied`, () => {
        const v1 = spy()
        const o = {
          a: 1,
          b: 2,
        }

        const constraints = [
          {
            name: `a`,
            validator: v1,
            isRequired: true,
          },
          {
            name: `b`,
            validator: v1,
            isRequired: true,
          },
        ]

        const validator = validateObjectKeysWithConstraints([], constraints)
        const validation = validator(o)
        expect(validation).toEqual(Success(o))
        expect(v1.notCalled).toBeTrue()
      })

      describe(`with mssing optional keys`, () => {
        const v1 = spy()
        const o = {
          a: 1,
        }

        const constraints = [
          {
            name: `a`,
            validator: v1,
            isRequired: true,
          },
          {
            name: `b`,
            validator: v1,
          },
        ]

        const validator = validateObjectKeysWithConstraints([], constraints)
        const validation = validator(o)
        expect(Success.hasInstance(validation)).toBeTrue()
        expect(validation).toEqual(Success(o))
        expect(v1.notCalled).toBeTrue()
      })

      describe(`not satisfied`, () => {
        describe(`with mssing required keys`, () => {
          const v1 = spy()
          const o = {
            a: 1,
            c: 2,
          }

          const constraints = [
            {
              name: `a`,
              validator: v1,
              isRequired: true,
            },
            {
              name: `b`,
              validator: v1,
              isRequired: true,
            },
          ]

          const validator = validateObjectKeysWithConstraints([], constraints)
          const validation = validator(o)
          expect(validation).toEqual(
            Failure([`Object included invalid key(s): '[c]'`])
          )
          expect(v1.notCalled).toBeTrue()
        })
      })
    })
  })

  describe(`object with key with value`, () => {
    describe(`with keys not on whitelist`, () => {
      it(`returns a Validation.Failure with a message for invalid keys`, () => {
        const value = { a: 1, b: 2 }
        const constraints = []
        const validator = validateObjectKeysWithConstraints([], constraints)
        const validation = validator(value)
        expect(validation).toEqual(
          Failure([`Object included invalid key(s): '[a, b]'`])
        )
      })
    })

    describe(`with constraints`, () => {
      describe(`satisfied`, () => {
        const v1 = spy()
        const o = {
          a: 1,
          b: 2,
        }

        const constraints = [
          {
            name: `a`,
            validator: v1,
            isRequired: true,
          },
          {
            name: `b`,
            validator: v1,
            isRequired: true,
          },
        ]

        const validator = validateObjectKeysWithConstraints([], constraints)
        const validation = validator(o)
        expect(validation).toEqual(Success(o))
        expect(v1.notCalled).toBeTrue()
      })

      describe(`with mssing optional keys`, () => {
        const v1 = spy()
        const o = {
          a: 1,
        }

        const constraints = [
          {
            name: `a`,
            validator: v1,
            isRequired: true,
          },
          {
            name: `b`,
            validator: v1,
          },
        ]

        const validator = validateObjectKeysWithConstraints([], constraints)
        const validation = validator(o)
        expect(Success.hasInstance(validation)).toBeTrue()
        expect(validation).toEqual(Success(o))
        expect(v1.notCalled).toBeTrue()
      })

      describe(`not satisfied`, () => {
        describe(`with mssing required keys`, () => {
          const v1 = spy()
          const o = {
            a: 1,
            c: 2,
          }

          const constraints = [
            {
              name: `a`,
              validator: v1,
              isRequired: true,
            },
            {
              name: `b`,
              validator: v1,
              isRequired: true,
            },
          ]

          const validator = validateObjectKeysWithConstraints([], constraints)
          const validation = validator(o)
          expect(validation).toEqual(
            Failure([`Object included invalid key(s): '[c]'`])
          )
          expect(v1.notCalled).toBeTrue()
        })
      })
    })
  })

  describe(`with validator for keys`, () => {
    describe(`which succeeds`, () => {
      it(`returns Validation.Success with supplied value`, () => {
        const o = {
          a: 1,
          b: 2,
        }
        const v1 = spy()
        const v2 = stubReturnsSuccess(o)

        const constraints = [
          {
            name: `a`,
            validator: v1,
            isRequired: true,
          },
          {
            name: `b`,
            validator: v1,
            isRequired: true,
          },
        ]
        const validator = validateObjectKeysWithConstraints(v2, constraints)
        const validation = validator(o)
        expect(validation).toEqual(Success(o))
        expect(v1.notCalled).toBeTrue()
        expect(v2.calledWith(o)).toBeTrue()
      })
    })

    describe(`which fails`, () => {
      it(`returns Validation.Failure with message`, () => {
        const o = {
          a: 1,
          b: 2,
        }
        const message = `message`
        const v1 = spy()
        const v2 = stubReturnsFailure(message)

        const constraints = [
          {
            name: `a`,
            validator: v1,
            isRequired: true,
          },
          {
            name: `b`,
            validator: v1,
            isRequired: true,
          },
        ]
        const validator = validateObjectKeysWithConstraints(v2, constraints)
        const validation = validator(o)
        expect(validation).toEqualFailureWithValue([message])
        expect(v1.notCalled).toBeTrue()
        expect(v2.calledWith(o)).toBeTrue()
      })
    })
  })
})
