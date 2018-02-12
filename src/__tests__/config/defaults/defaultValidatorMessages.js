import { mapObjIndexed, map } from 'ramda'
import validateIsLengthBetween from '../../../validators/association/validateIsLengthBetween'
import validateIsLengthGreaterThan from '../../../validators/association/validateIsLengthGreaterThan'
import validateIsLengthLessThan from '../../../validators/association/validateIsLengthLessThan'
import validateExclusiveKeys from '../../../validators/object/validateExclusiveKeys'
import {
  key2,
  key1,
  key3,
  key4,
  value3,
  value1,
  value2,
} from '../../testHelpers/fixtures/generic'
import validateRequiredKeys from '../../../validators/object/validateRequiredKeys'
import validateWhitelistedKeys from '../../../validators/object/validateWhitelistedKeys'
import validateObjectValues from '../../../validators/object/validateObjectValues'
import validateIsWhitelistedValue from '../../../validators/other/validateIsWhitelistedValue'
import validateIsNotBlacklistedValue from '../../../validators/other/validateIsNotBlacklistedValue'
import validateIsNumberWithUnit from '../../../validators/other/validateIsNumberWithUnit'
import {
  validateIsBoolean,
  validateIsArray,
} from '../../../validators/predicate/generatedPredicateValidators'
import { defaultRenderer } from '../../../config/defaults/defaultRenderers'
import predicateValidators from '../../testHelpers/data/predicateValidators'
import { prepareTestData } from '../../testHelpers/utils/predicateData'
import validateArrayElements from '../../../validators/array/validateArrayElements'
import { validateIsNumber } from '../../../index'

describe(`defaultRendererMessages`, () => {
  mapObjIndexed((validatorPair, name) => {
    let negate = true
    map(([, validatorName, validator, , invalidValues]) => {
      describe(`${validatorName}`, () => {
        it(`renders correctly`, () => {
          negate = !negate
          const failedValidation = validator(invalidValues[0])
          expect(defaultRenderer(failedValidation.value)).toEqual(
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
      expect(defaultRenderer(failedValidation.value)).toEqual(
        `Length wasn't between '1' and '2'`
      )
    })
  })

  describe(`validateIsLengthGreaterThan`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateIsLengthGreaterThan(1)(0)
      expect(defaultRenderer(failedValidation.value)).toEqual(
        `Length wasn't greater than '1'`
      )
    })
  })

  describe(`validateIsLengthLessThan`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateIsLengthLessThan(1)(2)
      expect(defaultRenderer(failedValidation.value)).toEqual(
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
      expect(defaultRenderer(failedValidation.value)).toEqual(
        `had more than one exlusive key: ['${key1}', '${key2}']`
      )
    })
  })

  describe(`validateRequiredKeys`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateRequiredKeys([key1, key2])({})
      expect(defaultRenderer(failedValidation.value)).toEqual(
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
      expect(defaultRenderer(failedValidation.value)).toEqual(
        `included key(s) not on whitelist: ['${key1}', '${key2}']`
      )
    })
  })

  describe(`validateWhitelistedKeys`, () => {
    it(`renders payload to message`, () => {
      const failedValidation = validateObjectValues({
        [key1]: validateIsArray,
        [key2]: validateIsBoolean,
      })({
        [key1]: 1,
        [key2]: 2,
      })

      expect(
        defaultRenderer(failedValidation.value)
      ).toEqualWithCompressedWhitespace(
        `Object
            – included invalid value(s)
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
        defaultRenderer(failedValidation.value)
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
        defaultRenderer(failedValidation.value)
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
        defaultRenderer(failedValidation.value)
      ).toEqualWithCompressedWhitespace(`Wasn't number with unit: '${unit}'`)
    })
  })

  // ---------------------------------------------------------------------------
  // Array
  // ---------------------------------------------------------------------------

  // describe(`validateArrayElements`, () => {
  //   it(`renders payload to message`, () => {
  //     const a = [1, 2, null]
  //     const failedValidation = validateArrayElements(validateIsNumber)(a)
  //     expect(
  //       defaultRenderer(failedValidation.value)
  //     ).toEqualWithCompressedWhitespace(`___`)
  //   })
  // })

  // [UIDS.IS_ARRAY_OF]: isArrayOfMessage,
  // [UIDS.ARRAY_ELEMENTS]: arrayElementsMessage,
  // //
})
