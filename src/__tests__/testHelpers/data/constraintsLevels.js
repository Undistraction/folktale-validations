import CONSTRAINT_FIELD_NAMES from '../../../const/constraintFieldNames'
import { name1 } from '../fixtures/generic'
import { constraintsObjName } from '../../../messages'
import { func } from '../fixtures/generic'
import { REPLACE_TOKEN } from '../const'

const { FIELDS, NAME, VALIDATOR, CHILDREN } = CONSTRAINT_FIELD_NAMES

// -----------------------------------------------------------------------------
// Level 1
// -----------------------------------------------------------------------------

const level1Expected = null

const level1Value = null

// -----------------------------------------------------------------------------
// Level 2
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// Level 3
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default [
  [level1Value, level1Expected],
  [level2Value, level2Expected],
  [level3Value, level3Expected],
]
