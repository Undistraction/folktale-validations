import { compose, map, when, always, inc, ifElse } from 'ramda'
import { isPositive } from 'ramda-adjunct'
import { propAnd, isAndObj, propOr, isAndOrOrObj } from '../utils'

const andOrRenderer = (
  renderPayload,
  { joinWithAnd, joinWithOr, groupItems }
) => o1 => {
  const render = level => o2 => {
    const groupIfLevelGt0 = when(always(isPositive(level)), groupItems)
    const processSubGroups = map(when(isAndOrOrObj, render(inc(level))))

    const processAndObj = compose(
      groupIfLevelGt0,
      joinWithAnd,
      map(renderPayload),
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
