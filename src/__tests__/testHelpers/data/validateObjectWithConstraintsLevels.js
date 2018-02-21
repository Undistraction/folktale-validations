import CONSTRAINT_FIELD_NAMES from '../../../const/constraintFieldNames'
import FAILURE_FIELD_NAMES from '../../../const/failureFieldNames'
import { name1, name2 } from '../fixtures/generic'
import { REPLACE_TOKEN } from '../const'
import { validateIsPlainObject, validateIsArrayOf } from '../../../index'

// -----------------------------------------------------------------------------
// Level 1
// -----------------------------------------------------------------------------

const level1ValueRoot = null
const level1ConstraintsRoot = null
const level1ExpectedFailureObjRoot = null

// -----------------------------------------------------------------------------
// Level 2
// -----------------------------------------------------------------------------

const level2ValueRoot = {
  [name1]: [REPLACE_TOKEN],
}

const level2ConstraintsRoot = {
  [CONSTRAINT_FIELD_NAMES.FIELDS]: [
    {
      [CONSTRAINT_FIELD_NAMES.NAME]: name1,
      [CONSTRAINT_FIELD_NAMES.VALIDATOR]: validateIsArrayOf(
        validateIsPlainObject
      ),
      [CONSTRAINT_FIELD_NAMES.CHILDREN]: REPLACE_TOKEN,
    },
  ],
}

const level2ExpectedFailureObjRoot = {
  [FAILURE_FIELD_NAMES.FIELDS]: {
    [name1]: {
      [FAILURE_FIELD_NAMES.CHILDREN]: {
        '0': REPLACE_TOKEN,
      },
    },
  },
}

// -----------------------------------------------------------------------------
// Level 3
// -----------------------------------------------------------------------------

const level3ValueRoot = {
  [name1]: [
    {
      [name2]: [REPLACE_TOKEN],
    },
  ],
}

const level3ConstraintsRoot = {
  [CONSTRAINT_FIELD_NAMES.FIELDS]: [
    {
      [CONSTRAINT_FIELD_NAMES.NAME]: name1,
      [CONSTRAINT_FIELD_NAMES.VALIDATOR]: validateIsArrayOf(
        validateIsPlainObject
      ),
      [CONSTRAINT_FIELD_NAMES.CHILDREN]: {
        [CONSTRAINT_FIELD_NAMES.FIELDS]: [
          {
            [CONSTRAINT_FIELD_NAMES.NAME]: name2,
            [CONSTRAINT_FIELD_NAMES.VALIDATOR]: validateIsArrayOf(
              validateIsPlainObject
            ),
            [CONSTRAINT_FIELD_NAMES.CHILDREN]: REPLACE_TOKEN,
          },
        ],
      },
    },
  ],
}

const level3ExpectedFailureObjRoot = {
  [FAILURE_FIELD_NAMES.FIELDS]: {
    [name1]: {
      [FAILURE_FIELD_NAMES.CHILDREN]: {
        '0': {
          [FAILURE_FIELD_NAMES.FIELDS]: {
            [name2]: {
              [FAILURE_FIELD_NAMES.CHILDREN]: {
                '0': REPLACE_TOKEN,
              },
            },
          },
        },
      },
    },
  },
}

export default [
  {
    valueRoot: level1ValueRoot,
    constraintsRoot: level1ConstraintsRoot,
    expectedFailureObjRoot: level1ExpectedFailureObjRoot,
  },
  {
    valueRoot: level2ValueRoot,
    constraintsRoot: level2ConstraintsRoot,
    expectedFailureObjRoot: level2ExpectedFailureObjRoot,
  },
  {
    valueRoot: level3ValueRoot,
    constraintsRoot: level3ConstraintsRoot,
    expectedFailureObjRoot: level3ExpectedFailureObjRoot,
  },
]
