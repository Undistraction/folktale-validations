import { inc, when, ifElse, always, __, assoc } from 'ramda'
import { isNotNull } from 'ramda-adjunct'
import { CONSTRAINT_FIELD_NAMES } from '../../const'
import { constraintsObjName } from '../../messages'
import { mapWithIndex } from '../../utils/iteration'
import { replaceTokenWith } from './utils'

const { NAME } = CONSTRAINT_FIELD_NAMES

export default (constraintsLevels, tests) => {
  mapWithIndex(([valueRoot, expectedRoot], index) => {
    const level = inc(index)

    const withValueRoot = when(
      always(isNotNull(valueRoot)),
      replaceTokenWith(__, valueRoot)
    )

    const withExpectedRoot = ifElse(
      always(isNotNull(expectedRoot)),
      replaceTokenWith(__, expectedRoot),
      assoc(NAME, constraintsObjName()) // Mark it as a constraint object
    )

    tests(level, withValueRoot, withExpectedRoot)
  })(constraintsLevels)
}
