import { cond, T, map, when, inc, always, compose } from 'ramda'
import { isPositive, isNotString } from 'ramda-adjunct'
import {
  isAndObj,
  isOrObj,
  isAndOrOrObj,
  propAnd,
  propOr,
} from '../../utils/failures'
import { throwInvalidFailureStructureMessage } from '../../errors'

const andOrRenderer = (
  renderPayload,
  { renderAnds, renderOrs, renderGroup }
) => o1 => {
  const processAndOrObj = level => o2 =>
    cond([
      // eslint-disable-next-line no-use-before-define
      [isAndObj, processAndObj(level)],
      // eslint-disable-next-line no-use-before-define
      [isOrObj, processOrObj(level)],
      [T, throwInvalidFailureStructureMessage],
    ])(o2)

  const processAndObj = level => o =>
    compose(
      when(always(isPositive(level)), renderGroup),
      renderAnds,
      map(when(isNotString, renderPayload)),
      map(when(isAndOrOrObj, processAndOrObj(inc(level)))),
      propAnd
    )(o)

  const processOrObj = level => o =>
    compose(
      when(always(isPositive(level)), renderGroup),
      renderOrs,
      map(when(isNotString, renderPayload)),
      map(when(isAndOrOrObj, processAndOrObj(inc(level)))),
      propOr
    )(o)

  return processAndOrObj(0)(o1)
}

export default andOrRenderer
