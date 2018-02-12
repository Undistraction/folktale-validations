import { map, mapObjIndexed } from 'ramda'
import predicateValidators from '../../testHelpers/data/predicateValidators'

import toPayload from '../../../failures/toPayload'
import { prepareTestData } from '../../testHelpers/utils/predicateData'

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
}, predicateValidators)
