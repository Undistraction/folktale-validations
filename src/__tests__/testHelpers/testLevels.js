import { inc, when, ifElse, always, __, assoc } from 'ramda'
import { isNotNull } from 'ramda-adjunct'
import { CONSTRAINT_FIELD_NAMES } from '../../const'
import { name1 } from './fixtures/constraintValues'
import { constraintsObjName } from '../../messages'
import { func } from './fixtures'
import { REPLACE_TOKEN } from './const'
import { mapWithIndex } from '../../utils'
import { replaceTokenWith } from './utils'

const { FIELDS, NAME, VALIDATOR, CHILDREN } = CONSTRAINT_FIELD_NAMES
const level1Expected = null
const level1Value = null

const level2Value = {
  [FIELDS]: [
    {
      [NAME]: name1,
      [VALIDATOR]: func,
      [CHILDREN]: REPLACE_TOKEN,
    },
  ],
}

const level2Expected = {
  [NAME]: constraintsObjName(),
  [FIELDS]: {
    [FIELDS]: {
      [CHILDREN]: [
        {
          [FIELDS]: {
            [CHILDREN]: REPLACE_TOKEN,
          },
        },
      ],
    },
  },
}

const level3Value = {
  [FIELDS]: [
    {
      [NAME]: name1,
      [VALIDATOR]: func,
      [CHILDREN]: {
        [FIELDS]: [
          {
            [NAME]: name1,
            [VALIDATOR]: func,
            [CHILDREN]: REPLACE_TOKEN,
          },
        ],
      },
    },
  ],
}

const level3Expected = {
  [NAME]: constraintsObjName(),
  [FIELDS]: {
    [FIELDS]: {
      [CHILDREN]: [
        {
          [FIELDS]: {
            [CHILDREN]: {
              [FIELDS]: {
                [FIELDS]: {
                  [CHILDREN]: [
                    {
                      [FIELDS]: {
                        [CHILDREN]: REPLACE_TOKEN,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ],
    },
  },
}

const levels = [
  [level1Value, level1Expected],
  [level2Value, level2Expected],
  [level3Value, level3Expected],
]

export default tests => {
  mapWithIndex(([valueRoot, expectedRoot], index) => {
    const level = inc(index)

    const withValueRoot = when(
      always(isNotNull(valueRoot)),
      replaceTokenWith(__, valueRoot)
    )

    const withExpectedRoot = ifElse(
      always(isNotNull(expectedRoot)),
      replaceTokenWith(__, expectedRoot),
      assoc(NAME, constraintsObjName())
    )

    tests(level, withValueRoot, withExpectedRoot)
  })(levels)
}
