import { mapObjIndexed, map } from 'ramda'
import {
  validateIsLengthBetween,
  validateIsLengthGreaterThan,
  validateIsLengthLessThan,
  validateExclusiveKeys,
  validateRequiredKeys,
  validateWhitelistedKeys,
  validateObjectValues,
  validateIsWhitelistedValue,
  validateIsNotBlacklistedValue,
  validateIsNumberWithUnit,
  validateIsBoolean,
  validateIsArray,
  defaultRenderers,
  validateIsNumber,
  validateArrayElements,
  validateObjectWithConstraints,
} from '../../../index'

import {
  key2,
  key1,
  key3,
  key4,
  value3,
  value1,
  value2,
  invalidKeyName,
} from '../../testHelpers/fixtures/generic'

import predicateValidators from '../../testHelpers/data/predicateValidators'
import { prepareTestData } from '../../testHelpers/utils/predicateData'
import validateIsArrayOf from '../../../validators/array/validateIsArrayOf'

describe(`validatorMessagesDefaults`, () => {
  const { failureRenderer, argumentsFailureRenderer } = defaultRenderers

  // ===========================================================================
  //
  // 1. Constraints
  //
  // ===========================================================================

  describe(`with invalid constraints`, () => {
    it(`renders the errorObj to message`, () => {
      const invalidConstraintsObj = {
        [invalidKeyName]: value1,
      }

      const configuredValidator = validateObjectWithConstraints(
        invalidConstraintsObj
      )

      const failedValidation = configuredValidator({})

      expect(
        failureRenderer(failedValidation.value)
      ).toEqualWithCompressedWhitespace(
        `Constraints included key(s) not on whitelist: ['fieldsValidator', 'fields']`
      )
    })
  })

  // ===========================================================================
  //
  // 1. Validations
  //
  // ===========================================================================

  // ---------------------------------------------------------------------------
  // Predicates
  // ---------------------------------------------------------------------------

  mapObjIndexed((validatorPair, name) => {
    let negate = true
    map(([, validatorName, validator, , invalidValues]) => {
      describe(`${validatorName}`, () => {
        it(`renders correctly`, () => {
          negate = !negate
          const failedValidation = validator(invalidValues[0])
          expect(failureRenderer(failedValidation.value)).toEqual(
            `${negate ? `Was` : `Wasn't`} ${name}`
          )
        })
      })
    }, prepareTestData(validatorPair))
  }, predicateValidators)

  // ---------------------------------------------------------------------------
  // Association
  // ---------------------------------------------------------------------------

  describe(`validateIsLengthBetween`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateIsLengthBetween(1, 2)(4)
      expect(failureRenderer(failedValidation.value)).toEqual(
        `Length wasn't between '1' and '2'`
      )
    })
  })

  describe(`validateIsLengthGreaterThan`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateIsLengthGreaterThan(1)(0)
      expect(failureRenderer(failedValidation.value)).toEqual(
        `Length wasn't greater than '1'`
      )
    })
  })

  describe(`validateIsLengthLessThan`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateIsLengthLessThan(1)(2)
      expect(failureRenderer(failedValidation.value)).toEqual(
        `Length wasn't less than '1'`
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Object
  // ---------------------------------------------------------------------------

  describe(`validateExclusiveKeys`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateExclusiveKeys([key1, key2])({
        [key1]: 1,
        [key2]: 2,
      })
      expect(failureRenderer(failedValidation.value)).toEqual(
        `had more than one exlusive key: ['${key1}', '${key2}']`
      )
    })
  })

  describe(`validateRequiredKeys`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateRequiredKeys([key1, key2])({})
      expect(failureRenderer(failedValidation.value)).toEqual(
        `missing required key(s): ['${key1}', '${key2}']`
      )
    })
  })

  describe(`validateWhitelistedKeys`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateWhitelistedKeys([key1, key2])({
        key3,
        key4,
      })
      expect(failureRenderer(failedValidation.value)).toEqual(
        `included key(s) not on whitelist: ['${key1}', '${key2}']`
      )
    })
  })

  describe(`validateObjectValues`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateObjectValues({
        [key1]: validateIsArray,
        [key2]: validateIsBoolean,
      })({
        [key1]: 1,
        [key2]: 2,
      })

      expect(
        failureRenderer(failedValidation.value)
      ).toEqualWithCompressedWhitespace(
        `Object included invalid value(s)
          – Key '${key1}': Wasn't Array
          – Key '${key2}': Wasn't Boolean`
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Other
  // ---------------------------------------------------------------------------

  describe(`validateIsWhitelistedValue`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateIsWhitelistedValue([value1, value2])(
        value3
      )
      expect(
        failureRenderer(failedValidation.value)
      ).toEqualWithCompressedWhitespace(
        `Value wasn't on the whitelist: ['${value1}', '${value2}']`
      )
    })
  })

  describe(`validateIsNotBlacklistedValue`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateIsNotBlacklistedValue([value1, value2])(
        value1
      )
      expect(
        failureRenderer(failedValidation.value)
      ).toEqualWithCompressedWhitespace(
        `Value was on the blacklist: ['${value1}', '${value2}']`
      )
    })
  })

  describe(`validateIsNumberWithUnit`, () => {
    it(`renders payload to message`, () => {
      const unit = `xx`
      const failedValidation = validateIsNumberWithUnit(unit)(12)
      expect(
        failureRenderer(failedValidation.value)
      ).toEqualWithCompressedWhitespace(`Wasn't number with unit: '${unit}'`)
    })
  })

  // ---------------------------------------------------------------------------
  // Array
  // ---------------------------------------------------------------------------

  describe(`validateArrayElements`, () => {
    it(`renders payload to message`, () => {
      const a = [1, 2, null, 3, null]
      const failedValidation = validateArrayElements(validateIsNumber)(a)
      expect(
        failureRenderer(failedValidation.value)
      ).toEqualWithCompressedWhitespace(
        `Array included invalid value(s)
          – [2] Wasn't Number
          – [4] Wasn't Number`
      )
    })
  })

  describe(`validateisArrayOf`, () => {
    it(`renders payload to message`, () => {
      const a = [1, 2, null, 3, null]
      const failedValidation = validateIsArrayOf(validateIsNumber)(a)
      expect(
        failureRenderer(failedValidation.value)
      ).toEqualWithCompressedWhitespace(
        `Array included invalid value(s)
          – [2] Wasn't Number
          – [4] Wasn't Number`
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Arguments Renderer
  // ---------------------------------------------------------------------------

  describe(`validateObjectValues`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateObjectValues({
        [key1]: validateIsArray,
        [key2]: validateIsBoolean,
      })({
        [key1]: 1,
        [key2]: 2,
      })

      expect(
        argumentsFailureRenderer(failedValidation.value)
      ).toEqualWithCompressedWhitespace(
        `Arguments included invalid value(s)
            – Key '${key1}': Wasn't Array
            – Key '${key2}': Wasn't Boolean`
      )
    })
  })
})
