import { compose, apply, __ } from 'ramda'

export default lookupMessage => payload => {
  const { uid, args } = payload
  return compose(apply(__, args), lookupMessage)(uid)
}
