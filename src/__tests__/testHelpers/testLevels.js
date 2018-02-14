import { inc, when, ifElse, always, __, assoc } from 'ramda'
import { isNotNull } from 'ramda-adjunct'
import CONSTRAINT_FIELD_NAMES from '../../const/constraintFieldNames'
import { constraintsObjName } from '../../messages'
import { mapWithIndex } from '../../utils/iteration'
import { replaceTokenWith } from './utils/objects'

const { NAME } = CONSTRAINT_FIELD_NAMES

export default (constraintsLevels, tests, rootFailureIsConstraints = false) => {
  mapWithIndex(
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
          assoc(NAME, constraintsObjName())
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
