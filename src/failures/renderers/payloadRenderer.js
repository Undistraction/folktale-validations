import { compose } from 'ramda'
import { applyFlipped } from '../../utils/function'

export default lookupMessage => payload => {
  const { uid, args } = payload
  return compose(applyFlipped(args), lookupMessage)(uid)
}
