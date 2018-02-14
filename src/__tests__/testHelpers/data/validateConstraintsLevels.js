import CONSTRAINT_FIELD_NAMES from '../../../const/constraintFieldNames'
import { constraintsObjName } from '../../../messages'
import { name1, func } from '../fixtures/generic'
import { REPLACE_TOKEN } from '../const'

const { FIELDS, NAME, VALIDATOR, CHILDREN } = CONSTRAINT_FIELD_NAMES

// -----------------------------------------------------------------------------
// Level 1
// -----------------------------------------------------------------------------

const level1ValueRoot = null
const level1ExpectedFailureObjRoot = null

// -----------------------------------------------------------------------------
// Level 2
// -----------------------------------------------------------------------------

const level2ValueRoot = {
  [FIELDS]: [
    {
      [NAME]: name1,
      [VALIDATOR]: func,
      [CHILDREN]: REPLACE_TOKEN,
    },
  ],
}

const level2ExpectedFailureObjRoot = {
  [NAME]: constraintsObjName(),
  [FIELDS]: {
    [FIELDS]: {
      [CHILDREN]: {
        '0': {
          [FIELDS]: {
            [CHILDREN]: REPLACE_TOKEN,
          },
        },
      },
    },
  },
}

// -----------------------------------------------------------------------------
// Level 3
// -----------------------------------------------------------------------------

const level3ValueRoot = {
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

const level3ExpectedFailureObjRoot = {
  [NAME]: constraintsObjName(),
  [FIELDS]: {
    [FIELDS]: {
      [CHILDREN]: {
        '0': {
          [FIELDS]: {
            [CHILDREN]: {
              [FIELDS]: {
                [FIELDS]: {
                  [CHILDREN]: {
                    '0': {
                      [FIELDS]: {
                        [CHILDREN]: REPLACE_TOKEN,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default [
  {
    valueRoot: level1ValueRoot,
    expectedFailureObjRoot: level1ExpectedFailureObjRoot,
  },
  {
    valueRoot: level2ValueRoot,
    expectedFailureObjRoot: level2ExpectedFailureObjRoot,
  },
  {
    valueRoot: level3ValueRoot,
    expectedFailureObjRoot: level3ExpectedFailureObjRoot,
  },
]
