import { compose, assoc, head, of } from 'ramda'
import { validation as Validation } from 'folktale'

const { Failure } = Validation

export default (uid, validator) => o =>
  validator(o).orElse(compose(Failure, of, assoc(`uid`, uid), head))
