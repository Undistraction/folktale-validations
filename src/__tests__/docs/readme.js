import {
  isSuccess,
  isFailure,
  validateIsString,
  validateIsLengthGreaterThan,
  defaultRenderers,
  validateIsNumber,
  validateObjectValues,
  validateIsNotEmpty,
  validateIsRegExp,
  validateArrayElements,
  allOfValidator,
  validateIsLengthLessThan,
} from '../../index'

describe(`code from README.md`, () => {
  const { failureRenderer } = defaultRenderers

  describe(`Example 1 - Individual Validator`, () => {
    it(`returns expected values`, () => {
      const validValue = `a`
      const successfulValidation = validateIsString(validValue)

      expect(isSuccess(successfulValidation)).toBeTrue()
      expect(successfulValidation.value).toEqual(validValue)

      const invalidValue = 1
      const failedValidation = validateIsString(invalidValue)
      const message = failureRenderer(failedValidation.value)

      expect(isFailure(failedValidation)).toBeTrue()
      expect(failedValidation.value).toEqual({
        uid: `folktale-validations.validate.validateIsString`,
        value: invalidValue,
        args: [],
      })
      expect(message).toEqual(`Wasn't String`)
    })
  })

  describe(`Example 2 - Association Validator`, () => {
    it(`returns expected values`, () => {
      const configuredValidator = validateIsLengthGreaterThan(2)

      const validValue = `abc`
      const successfulValidation = configuredValidator(validValue)

      expect(isSuccess(successfulValidation)).toBeTrue()
      expect(successfulValidation.value).toEqual(validValue)

      const invalidValue = `a`
      const failedValidation = configuredValidator(invalidValue)
      const message = failureRenderer(failedValidation.value)

      expect(isFailure(failedValidation)).toBeTrue()
      expect(failedValidation.value).toEqual({
        uid: `folktale-validations.validate.validateIsLengthGreaterThan`,
        value: invalidValue,
        args: [2],
      })
      expect(message).toEqual(`Length wasn't greater than '2'`)
    })
  })

  describe(`Example 3 - Object Validator`, () => {
    it(`returns expected values`, () => {
      const configuredValidator = validateObjectValues({
        a: validateIsNumber,
        b: validateIsString,
        c: validateIsNotEmpty,
      })

      const validValue = {
        a: 1,
        b: `example`,
        c: [1, 2, 3],
      }
      const successfulValidation = configuredValidator(validValue)

      expect(isSuccess(successfulValidation)).toBeTrue()
      expect(successfulValidation.value).toEqual(validValue)

      const invalidValue = {
        a: `example`,
        b: true,
        c: [],
      }
      const failedValidation = configuredValidator(invalidValue)
      const message = failureRenderer(failedValidation.value)

      expect(isFailure(failedValidation)).toBeTrue()
      expect(failedValidation.value).toEqual({
        fields: {
          a: {
            uid: `folktale-validations.validate.validateIsNumber`,
            value: `example`,
            args: [],
          },
          b: {
            uid: `folktale-validations.validate.validateIsString`,
            value: true,
            args: [],
          },
          c: {
            uid: `folktale-validations.validate.validateIsNotEmpty`,
            value: [],
            args: [],
          },
        },
      })
      expect(message).toEqualWithCompressedWhitespace(
        `Object
          – included invalid value(s)
            – Key 'a': Wasn't Number
            – Key 'b': Wasn't String
            – Key 'c': Was Empty`
      )
    })
  })

  describe(`Example 4 - Array Validator`, () => {
    it(`returns expected values`, () => {
      const configuredValidator = validateArrayElements(validateIsRegExp)

      const validValue = [/a/, /b/, /c/]
      const successfulValidation = configuredValidator(validValue)

      expect(isSuccess(successfulValidation)).toBeTrue()
      expect(successfulValidation.value).toEqual(validValue)

      const invalidValue = [/a/, `/b/`, /c/]
      const failedValidation = configuredValidator(invalidValue)
      const message = failureRenderer(failedValidation.value)

      expect(isFailure(failedValidation)).toBeTrue()
      expect(failedValidation.value).toEqual({
        children: {
          '1': {
            uid: `folktale-validations.validate.validateIsRegExp`,
            value: `/b/`,
            args: [],
          },
        },
      })
      expect(message).toEqualWithCompressedWhitespace(
        `Array included invalid value(s)
          – [1] Wasn't RegExp`
      )
    })
  })

  describe(`Example 5 - allOf Validator`, () => {
    it(`returns expected values`, () => {
      const configuredValidator = allOfValidator([
        validateIsString,
        validateIsLengthLessThan(5),
      ])

      const validValue = `abcd`
      const successfulValidation = configuredValidator(validValue)

      expect(isSuccess(successfulValidation)).toBeTrue()
      expect(successfulValidation.value).toEqual(validValue)

      const invalidValue = 1
      const failedValidation = configuredValidator(invalidValue)
      const message = failureRenderer(failedValidation.value)

      expect(isFailure(failedValidation)).toBeTrue()
      expect(failedValidation.value).toEqual({
        and: [
          {
            uid: `folktale-validations.validate.validateIsString`,
            value: 1,
            args: [],
          },
          {
            uid: `folktale-validations.validate.validateIsLengthLessThan`,
            value: 1,
            args: [5],
          },
        ],
      })
      expect(message).toEqualWithCompressedWhitespace(
        `Wasn't String and Length wasn't less than '5'`
      )
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
