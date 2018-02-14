import { validation as Validation } from 'folktale'
import { compose, reduce, toPairs, always, pair } from 'ramda'
import { isNotUndefined } from 'ramda-adjunct'
import { toObjectError } from '../../utils/failures'
import { composeFailure } from '../../utils/validations'

const { Success, Failure } = Validation

const validate = validatorsMap => (acc, [name, v]) => {
  const validator = validatorsMap[name]

  return isNotUndefined(validator)
    ? validator(v).matchWith({
        Success: always(acc),
        Failure: ({ value }) => acc.concat(Failure([pair(name, value)])),
      })
    : acc
}

const validateObjectValues = validatorsMap => o =>
  compose(reduce(validate(validatorsMap), Success(o)), toPairs)(o).orElse(
    composeFailure(toObjectError)
  )

export default validateObjectValues
