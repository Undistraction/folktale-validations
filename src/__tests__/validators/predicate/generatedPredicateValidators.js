import { map, mapObjIndexed, compose, reverse } from 'ramda'

import { mapObjIndexedWithIndex } from '../../../utils/iteration'
import validators from '../../testHelpers/data/predicateValidators'
import {
  propValues,
  propValidators,
  propUIDs,
} from '../../testHelpers/utils/predicateData'
import toPayload from '../../../failures/toPayload'

const prepareTestData = validatorPair =>
  mapObjIndexedWithIndex((validator, name, o, i) => {
    const testValues =
      i === 0
        ? propValues(validatorPair)
        : compose(reverse, propValues)(validatorPair)
    return [propUIDs(validatorPair)[i], name, validator, ...testValues]
  }, propValidators(validatorPair))

mapObjIndexed((validatorPair, name) => {
  describe(`validators for '${name}'`, () => {
    map(
      ([
        validatorUID,
        validatorName,
        validator,
        validValues,
        invalidValues,
      ]) => {
        describe(`${validatorName}()`, () => {
          describe(`without configured message`, () => {
            describe(`when argument is valid`, () => {
              it(`returns a Validation.Success with the supplied value`, () => {
                map(value => {
                  const validation = validator(value)
                  expect(validation).toEqualSuccessWithValue(value)
                }, validValues)
              })
            })
            describe(`when argument is not valid`, () => {
              it(`returns a Validation.Failure with an error message`, () => {
                map(value => {
                  const expected = toPayload(validatorUID, value)
                  const validation = validator(value)
                  expect(validation).toEqualFailureWithValue(expected)
                }, invalidValues)
              })
            })
          })
        })
      },
      prepareTestData(validatorPair)
    )
  })
}, validators)
