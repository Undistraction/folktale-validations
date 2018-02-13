import { compose, apply, flip } from 'ramda'

export default lookupMessage => payload => {
  const { uid, args } = payload
  return compose(flip(apply)(args), lookupMessage)(uid)
}
