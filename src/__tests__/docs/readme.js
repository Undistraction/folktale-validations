import {
  // orValidator,
  // andValidator,
  defaultRenderers,
  toPayload,
} from '../../index'
import { validateIsString } from '../../../lib/validators/predicate/generatedPredicateValidators'
import { IS_STRING } from '../../../lib/const/validatorUids'

describe(`code from README.md`, () => {
  describe(`Individual validators`, () => {
    describe(`Successful validator`, () => {
      it.only(`returns Success with supplied value`, () => {
        const value = `a`
        const successfulValidation = validateIsString(value)
        expect(successfulValidation).toEqualSuccessWithValue(value)
      })
    })

    describe(`Unsuccessful validator`, () => {
      it.only(`returns Failure with payload`, () => {
        const { failureRenderer } = defaultRenderers
        const value = 1

        const expectedRenderedMessage = `Wasn't String`

        const failedValidation = validateIsString(value)
        const renderedFailure = failureRenderer(failedValidation.value)

        expect(renderedFailure).toEqualWithCompressedWhitespace(
          expectedRenderedMessage
        )
      })
    })
  })

  // describe(`Alternatives`, () => {
  //   describe(`Or`, () => {
  //     it(`returns expected values`, () => {
  //       const configuredValidator = orValidator(
  //         defaultValidators.validateIsString,
  //         defaultValidators.validateIsNumber
  //       )

  //       const successfulValidation1 = configuredValidator(`a`)
  //       const successfulValidation2 = configuredValidator(1)
  //       const failedValidation = configuredValidator([])

  //       expect(successfulValidation1).toEqualSuccessWithValue(`a`)
  //       expect(successfulValidation2).toEqualSuccessWithValue(1)
  //       expect(failedValidation).toEqualFailureWithValue([
  //         `Wasn't 'String' and Wasn't 'Number'`,
  //       ])
  //     })
  //   })

  //   describe(`And`, () => {
  //     it(`returns expected values`, () => {
  //       const configuredValidator = andValidator(
  //         defaultValidators.validateIsString,
  //         defaultValidators.validateIsLengthGreaterThan(2)
  //       )
  //       const successfulValidation = configuredValidator(`abc`)
  //       const failedValidation1 = configuredValidator(1)
  //       const failedValidation2 = configuredValidator(`a`)

  //       expect(successfulValidation).toEqualSuccessWithValue(`abc`)
  //       expect(failedValidation1).toEqualFailureWithValue([
  //         `Wasn't 'String' and Length wasn't greater than 2`,
  //       ])
  //       expect(failedValidation2).toEqualFailureWithValue([
  //         `Length wasn't greater than 2`,
  //       ])
  //     })
  //   })
  // })

  // describe(`Constraints`, () => {
  //   describe(`Flat Object`, () => {
  //     const constraints = {
  //       fields: [
  //         {
  //           name: `a`,
  //           validator: defaultValidators.validateIsString,
  //           isRequired: true,
  //         },
  //         {
  //           name: `b`,
  //           validator: defaultValidators.validateIsNumber,
  //         },
  //         {
  //           name: `c`,
  //           validator: defaultValidators.validateIsBoolean,
  //           defaultValue: true,
  //         },
  //       ],
  //     }
  //     // -----------------------------------------------------------------------
  //     // Flat Valid Object
  //     // -----------------------------------------------------------------------
  //     describe(`valid`, () => {
  //       it(`returns expected values`, () => {
  //         const configuredValidator = defaultValidators.validateObjectWithConstraints(
  //           constraints
  //         )

  //         const validObject = {
  //           a: `a`,
  //         }

  //         const successfulValidation = configuredValidator(validObject)

  //         expect(successfulValidation).toEqualSuccessWithValue({
  //           a: `a`,
  //           c: true,
  //         })
  //       })
  //     })
  //     // -----------------------------------------------------------------------
  //     // Flat Invalid Object
  //     // -----------------------------------------------------------------------
  //     describe(`invalid`, () => {
  //       // ---------------------------------------------------------------------
  //       // 1. Missing Required Key
  //       // ---------------------------------------------------------------------
  //       describe(`Missing required key`, () => {
  //         it(`returns expected values`, () => {
  //           const configuredValidator = defaultValidators.validateObjectWithConstraints(
  //             constraints
  //           )

  //           const invalidObject = {}

  //           const failedValidation = configuredValidator(invalidObject)

  //           expect(failedValidation).toEqualFailureWithValue({
  //             fieldsFailureMessage: [`missing required key(s): ['a']`],
  //           })
  //         })
  //       })
  //       // ---------------------------------------------------------------------
  //       // 2. With Additional Keys
  //       // ---------------------------------------------------------------------
  //       describe(`Additional keys`, () => {
  //         it(`returns expected values`, () => {
  //           const configuredValidator = defaultValidators.validateObjectWithConstraints(
  //             constraints
  //           )

  //           const invalidObject = {
  //             a: `a`,
  //             d: `d`,
  //           }

  //           const failedValidation = configuredValidator(invalidObject)

  //           expect(failedValidation).toEqualFailureWithValue({
  //             fieldsFailureMessage: [`included invalid key(s): '[d]'`],
  //           })
  //         })
  //       })
  //     })
  //   })
  // })
})
