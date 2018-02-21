import CONSTRAINT_FIELD_NAMES from '../../../const/constraintFieldNames'
import { name1, func } from '../fixtures/generic'
import { REPLACE_TOKEN } from '../const'
import FAILURE_FIELD_NAMES from '../../../const/failureFieldNames'
import FAILURE_SCOPE_FIELD_NAMES from '../../../const/failureScopeFieldNames'

// -----------------------------------------------------------------------------
// Level 1
// -----------------------------------------------------------------------------

const level1ValueRoot = null
const level1ExpectedFailureObjRoot = null

// -----------------------------------------------------------------------------
// Level 2
// -----------------------------------------------------------------------------

const level2ValueRoot = {
  [CONSTRAINT_FIELD_NAMES.FIELDS]: [
    {
      [CONSTRAINT_FIELD_NAMES.NAME]: name1,
      [CONSTRAINT_FIELD_NAMES.VALIDATOR]: func,
      [CONSTRAINT_FIELD_NAMES.CHILDREN]: REPLACE_TOKEN,
    },
  ],
}

const level2ExpectedFailureObjRoot = {
  [FAILURE_FIELD_NAMES.SCOPE]: {
    [FAILURE_SCOPE_FIELD_NAMES.NAME]: `Constraints`,
  },
  [FAILURE_FIELD_NAMES.FIELDS]: {
    [FAILURE_FIELD_NAMES.FIELDS]: {
      [FAILURE_FIELD_NAMES.CHILDREN]: {
        '0': {
          [FAILURE_FIELD_NAMES.FIELDS]: {
            [FAILURE_FIELD_NAMES.CHILDREN]: REPLACE_TOKEN,
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
  [CONSTRAINT_FIELD_NAMES.FIELDS]: [
    {
      [CONSTRAINT_FIELD_NAMES.NAME]: name1,
      [CONSTRAINT_FIELD_NAMES.VALIDATOR]: func,
      [CONSTRAINT_FIELD_NAMES.CHILDREN]: {
        [CONSTRAINT_FIELD_NAMES.FIELDS]: [
          {
            [CONSTRAINT_FIELD_NAMES.NAME]: name1,
            [CONSTRAINT_FIELD_NAMES.VALIDATOR]: func,
            [CONSTRAINT_FIELD_NAMES.CHILDREN]: REPLACE_TOKEN,
          },
        ],
      },
    },
  ],
}

const level3ExpectedFailureObjRoot = {
  [FAILURE_FIELD_NAMES.SCOPE]: {
    name: `Constraints`,
  },
  [FAILURE_FIELD_NAMES.FIELDS]: {
    [FAILURE_FIELD_NAMES.FIELDS]: {
      [FAILURE_FIELD_NAMES.CHILDREN]: {
        '0': {
          [FAILURE_FIELD_NAMES.FIELDS]: {
            [FAILURE_FIELD_NAMES.CHILDREN]: {
              [FAILURE_FIELD_NAMES.FIELDS]: {
                [FAILURE_FIELD_NAMES.FIELDS]: {
                  [FAILURE_FIELD_NAMES.CHILDREN]: {
                    '0': {
                      [FAILURE_FIELD_NAMES.FIELDS]: {
                        [FAILURE_FIELD_NAMES.CHILDREN]: REPLACE_TOKEN,
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
