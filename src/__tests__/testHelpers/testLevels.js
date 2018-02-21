import { inc, when, ifElse, always, __ } from 'ramda'
import { isNotNull, mapIndexed } from 'ramda-adjunct'
import { replaceTokenWith } from './utils/objects'
import { setPropScope } from '../../utils/failures'

export default (constraintsLevels, tests, rootFailureIsConstraints = false) => {
  mapIndexed(
    ({ valueRoot, constraintsRoot, expectedFailureObjRoot }, index) => {
      const level = inc(index)

      const withValueRoot = when(
        always(isNotNull(valueRoot)),
        replaceTokenWith(__, valueRoot)
      )

      const withConstraintsRoot = when(
        always(isNotNull(constraintsRoot)),
        replaceTokenWith(__, constraintsRoot)
      )

      const withExpectedFailureObjRoot = ifElse(
        always(isNotNull(expectedFailureObjRoot)),
        replaceTokenWith(__, expectedFailureObjRoot),
        when(
          always(rootFailureIsConstraints),
          setPropScope({
            name: `Constraints`,
          })
        ) // Mark it as a constraint object
      )

      tests(level, {
        withValueRoot,
        withConstraintsRoot,
        withExpectedFailureObjRoot,
      })
    }
  )(constraintsLevels)
}
