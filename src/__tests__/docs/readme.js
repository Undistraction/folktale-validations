import {
  always,
  compose,
  curry,
  isEmpty,
  reject,
  flip,
  contains,
  toUpper,
} from 'ramda'
import { validation as Validation } from 'folktale'
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
  orValidator,
  validateIsDate,
  validateObjectWithConstraints,
  validateIsArrayOf,
  validateIsBoolean,
  validateIsNonEmptyArray,
  validateIsObject,
  configureRenderers,
  validatorUids,
  decorateValidator,
  validateIsWhitelistedValue,
  regExpValidator,
  toPayload,
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
        uid: `folktale-validations.validateIsString`,
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
        uid: `folktale-validations.validateIsLengthGreaterThan`,
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
            uid: `folktale-validations.validateIsNumber`,
            value: `example`,
            args: [],
          },
          b: {
            uid: `folktale-validations.validateIsString`,
            value: true,
            args: [],
          },
          c: {
            uid: `folktale-validations.validateIsNotEmpty`,
            value: [],
            args: [],
          },
        },
      })
      expect(message).toEqualMultiline(`
        Object included invalid value(s)
          – a: Wasn't Number
          – b: Wasn't String
          – c: Was Empty`)
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
            uid: `folktale-validations.validateIsRegExp`,
            value: `/b/`,
            args: [],
          },
        },
      })
      expect(message).toEqualMultiline(`
        Array included invalid value(s)
          – [1] Wasn't RegExp`)
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
            uid: `folktale-validations.validateIsString`,
            value: 1,
            args: [],
          },
          {
            uid: `folktale-validations.validateIsLengthLessThan`,
            value: 1,
            args: [5],
          },
        ],
      })
      expect(message).toEqual(`Wasn't String and Length wasn't less than '5'`)
    })
  })

  describe(`Example 6 - composition`, () => {
    it(`returns expected values`, () => {
      const configuredValidator = allOfValidator([
        orValidator(validateIsString, validateIsNumber),
        validateIsLengthLessThan(5),
      ])

      const validValue = `abcd`
      const successfulValidation = configuredValidator(validValue)

      expect(isSuccess(successfulValidation)).toBeTrue()
      expect(successfulValidation.value).toEqual(validValue)

      const invalidValue = null
      const failedValidation = configuredValidator(invalidValue)
      const message = failureRenderer(failedValidation.value)

      expect(isFailure(failedValidation)).toBeTrue()
      expect(failedValidation.value).toEqual({
        and: [
          {
            or: [
              {
                uid: `folktale-validations.validateIsString`,
                value: null,
                args: [],
              },
              {
                uid: `folktale-validations.validateIsNumber`,
                value: null,
                args: [],
              },
            ],
          },
          {
            uid: `folktale-validations.validateIsLengthLessThan`,
            value: null,
            args: [5],
          },
        ],
      })
      expect(message).toEqual(
        `(Wasn't String or Wasn't Number) and Length wasn't less than '5'`
      )
    })
  })

  describe(`Example 7 - Constraints With Flat Object`, () => {
    it(`returns expected values`, () => {
      const constraints = {
        fields: [
          {
            name: `a`,
            validator: validateIsString,
          },
          {
            name: `b`,
            validator: validateIsArrayOf(validateIsNumber),
          },
          {
            name: `c`,
            validator: validateIsDate,
          },
        ],
      }

      const confguredValidator = validateObjectWithConstraints(constraints)

      const validValue = {
        a: `abc`,
        b: [1, 2, 3],
        c: new Date(`01-01-2001`),
      }

      const successfulValidation = confguredValidator(validValue)

      expect(isSuccess(successfulValidation)).toBeTrue()
      expect(successfulValidation.value).toEqual(validValue)

      const invalidValue = {
        a: 123,
        b: null,
        c: `01-01-2001`,
      }

      const failedValidation = confguredValidator(invalidValue)
      const message = failureRenderer(failedValidation.value)

      expect(isFailure(failedValidation)).toBeTrue()
      expect(failedValidation.value).toEqual({
        fields: {
          a: {
            uid: `folktale-validations.validateIsString`,
            value: 123,
            args: [],
          },
          b: {
            uid: `folktale-validations.validateIsArray`,
            value: null,
            args: [],
          },
          c: {
            uid: `folktale-validations.validateIsDate`,
            value: `01-01-2001`,
            args: [],
          },
        },
      })
      expect(message).toEqualMultiline(`
        Object included invalid value(s)
          – a: Wasn't String
          – b: Wasn't Array
          – c: Wasn't Date`)
    })
  })

  describe(`Example 8 - Using isRequired, defaultValue and transformer`, () => {
    it(`returns expected values`, () => {
      const constraints = {
        fields: [
          {
            name: `a`,
            isRequired: true,
            validator: validateIsString,
            transformer: toUpper,
          },
          {
            name: `b`,
            validator: validateIsBoolean,
            defaultValue: true,
          },
        ],
      }

      const confguredValidator = validateObjectWithConstraints(constraints)

      const validValue = {
        a: `abc`,
      }

      const expectedValue = {
        a: `ABC`,
        b: true,
      }

      const successfulValidation = confguredValidator(validValue)

      expect(isSuccess(successfulValidation)).toBeTrue()
      expect(successfulValidation.value).toEqual(expectedValue)

      const invalidValue = {
        b: false,
      }

      const failedValidation = confguredValidator(invalidValue)
      const message = failureRenderer(failedValidation.value)

      expect(isFailure(failedValidation)).toBeTrue()
      expect(failedValidation.value).toEqual({
        fieldsFailureMessage: {
          uid: `folktale-validations.validateRequiredKeys`,
          value: { b: false },
          args: [[`a`], [`a`]],
        },
      })
      expect(message).toEqual(`Object missing required key(s): ['a']`)
    })
  })

  describe(`Example 9 - Constraints With Object Graph`, () => {
    it(`returns expected values`, () => {
      const constraints = {
        fields: [
          {
            name: `a`,
            isRequired: true,
            validator: validateIsObject,
            value: {
              fields: [
                {
                  name: `a-a`,
                  isRequired: true,
                  validator: validateIsBoolean,
                },
                {
                  name: `a-b`,
                  isRequired: true,
                  validator: validateIsNonEmptyArray,
                  children: {
                    fields: [
                      {
                        name: `a-b-a`,
                        isRequired: true,
                        validator: validateIsString,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      }

      const confguredValidator = validateObjectWithConstraints(constraints)

      const validValue = {
        a: {
          [`a-a`]: true,
          [`a-b`]: [
            {
              [`a-b-a`]: `abc`,
            },
            {
              [`a-b-a`]: `def`,
            },
          ],
        },
      }

      const successfulValidation = confguredValidator(validValue)

      expect(isSuccess(successfulValidation)).toBeTrue()
      expect(successfulValidation.value).toEqual(validValue)

      const invalidValue = {
        a: {
          [`a-a`]: true,
          [`a-b`]: [
            {
              [`a-b-a`]: `abc`,
            },
            {
              [`a-b-a`]: 123,
            },
          ],
        },
      }

      const failedValidation = confguredValidator(invalidValue)
      const message = failureRenderer(failedValidation.value)

      expect(isFailure(failedValidation)).toBeTrue()
      expect(failedValidation.value).toEqual({
        fields: {
          a: {
            fields: {
              'a-b': {
                children: {
                  '1': {
                    fields: {
                      'a-b-a': {
                        uid: `folktale-validations.validateIsString`,
                        value: 123,
                        args: [],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
      expect(message).toEqualMultiline(`
        Object included invalid value(s)
          – a: Object included invalid value(s)
            – a-b: Array included invalid value(s)
              – [1] Object included invalid value(s)
                – a-b-a: Wasn't String`)
    })
  })

  describe(`Example 10 - Customising Validation Failure Messages`, () => {
    it(`returns expected values`, () => {
      const newMessage = `Boolean it isn't`
      const { failureRenderer: configuredFailureRenderer } = configureRenderers(
        {
          validatorMessages: {
            [validatorUids.VALIDATE_IS_BOOLEAN]: always(newMessage),
          },
        }
      )

      const failedValidation = validateIsBoolean(`yoda`)
      const message = configuredFailureRenderer(failedValidation.value)
      expect(message).toEqual(newMessage)
    })
  })

  describe(`Example 11 - Creating Validator Based On Existing Validator`, () => {
    it(`returns expected values`, () => {
      const newUID = `example.validateIsValidTitle`
      const newMessageFunction = whitelist => `Wasn't a title: ${whitelist}`
      const titles = [`mr`, `mrs`, `miss`, `ms`, `dr`, `mx`]

      const { failureRenderer: configuredFailureRenderer } = configureRenderers(
        {
          validatorMessages: {
            [newUID]: newMessageFunction,
          },
        }
      )

      const titleValidator = compose(
        decorateValidator(newUID),
        validateIsWhitelistedValue
      )(titles)

      const failedValidation = titleValidator(`emperor`)
      const message = configuredFailureRenderer(failedValidation.value)
      expect(message).toEqual(`Wasn't a title: mr,mrs,miss,ms,dr,mx`)
    })
  })

  // describe(`Example 12 - Creating Validator Based On Existing Validator`, () => {

  // })

  describe(`Example 13 - Creating a Validator Using Helpers`, () => {
    it(`returns expected values`, () => {
      const UID = `example.hasNotWhitespaceValidator`
      const newMessageFunction = always(`Should not contain whitespace`)
      const regExp = /^\S+$/

      const { failureRenderer: configuredFailureRenderer } = configureRenderers(
        {
          validatorMessages: {
            [UID]: newMessageFunction,
          },
        }
      )

      const validateHasNoWhitespace = regExpValidator(UID, regExp)

      const successfulValidation = validateHasNoWhitespace(`ab`)
      expect(isSuccess(successfulValidation)).toBeTrue()

      const failedValidation = validateHasNoWhitespace(`a b`)
      const message = configuredFailureRenderer(failedValidation.value)
      expect(message).toEqual(`Should not contain whitespace`)
    })
  })

  describe(`Example 14 - Creating a Validator From Scratch`, () => {
    it(`returns expected values`, () => {
      const UID = `example.validateContainsChars`
      const newMessageFunction = chars => `Didn't contain chars: [${chars}]`

      const { failureRenderer: configuredFailureRenderer } = configureRenderers(
        {
          validatorMessages: {
            [UID]: newMessageFunction,
          },
        }
      )

      const containsChars = (chars, s) =>
        compose(isEmpty, reject(flip(contains)(s)))(chars)

      const { Success, Failure } = Validation

      const validateContainsChars = curry(
        (chars, value) =>
          containsChars(chars, value)
            ? Success(value)
            : compose(Failure, toPayload)(UID, value, [chars])
      )

      const configuredValidator = validateContainsChars([`a`, `b`, `c`])

      const successfulValidation = configuredValidator(`cab`)
      expect(isSuccess(successfulValidation)).toBeTrue()

      const failedValidation = configuredValidator(`cat`)
      const message = configuredFailureRenderer(failedValidation.value)
      expect(message).toEqual(`Didn't contain chars: [a,b,c]`)
    })
  })
})
