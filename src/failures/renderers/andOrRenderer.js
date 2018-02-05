import { compose, map, when, always, inc, ifElse } from 'ramda'
import {
  propAnd,
  isAndObj,
  propOr,
  isAndOrOrObj,
  greaterThanZero,
} from '../utils'

const andOrRenderer = ({ joinWithAnd, joinWithOr, group }) => o1 => {
  const render = level => o2 => {
    const groupIfLevelGt0 = when(always(greaterThanZero(level)), group)
    const processSubGroups = map(when(isAndOrOrObj, render(inc(level))))

    const processAndObj = compose(
      groupIfLevelGt0,
      joinWithAnd,
      processSubGroups,
      propAnd
    )

    const processOrObj = compose(
      groupIfLevelGt0,
      joinWithOr,
      processSubGroups,
      propOr
    )

    return compose(ifElse(isAndObj, processAndObj, processOrObj))(o2)
  }

  return render(0)(o1)
}

export default andOrRenderer
