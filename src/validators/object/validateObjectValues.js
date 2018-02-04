import { validation as Validation } from 'folktale'
import { compose, reduce, toPairs, always, curry, pair } from 'ramda'
import { isNotUndefined } from 'ramda-adjunct'
import { toObjectError } from '../../failures/utils'

const { Success, Failure } = Validation

const validate = (valueErrorMessage, validatorsMap) => (acc, [name, v]) => {
  const validator = validatorsMap[name]

  return isNotUndefined(validator)
    ? validator(v).matchWith({
        Success: always(acc),
        Failure: ({ value }) => acc.concat(Failure([pair(name, value)])),
      })
    : acc
}

export default curry(
  (objectValuesMessage, valueErrorMessage, validatorsMap) => o =>
    compose(
      reduce(validate(valueErrorMessage, validatorsMap), Success(o)),
      toPairs
    )(o).orElse(compose(Failure, toObjectError))
)
