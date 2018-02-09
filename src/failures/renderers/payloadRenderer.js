import { compose, applyTo } from 'ramda'

export default lookupMessage => payload => {
  const { uid, args } = payload
  return compose(applyTo(args), lookupMessage)(uid)
}
