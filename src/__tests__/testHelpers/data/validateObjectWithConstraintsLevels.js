import CONSTRAINT_FIELD_NAMES from '../../../const/constraintFieldNames'
import { name1, name2 } from '../fixtures/generic'
import { REPLACE_TOKEN } from '../const'
import { validateIsPlainObject, validateIsArrayOf } from '../../../index'

const { FIELDS, NAME, VALIDATOR, CHILDREN } = CONSTRAINT_FIELD_NAMES

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
  [FIELDS]: [
    {
      [NAME]: name1,
      [VALIDATOR]: validateIsArrayOf(validateIsPlainObject),
      [CHILDREN]: REPLACE_TOKEN,
    },
  ],
}

const level2ExpectedFailureObjRoot = {
  [FIELDS]: {
    [name1]: {
      [CHILDREN]: {
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
  [FIELDS]: [
    {
      [NAME]: name1,
      [VALIDATOR]: validateIsArrayOf(validateIsPlainObject),
      [CHILDREN]: {
        [FIELDS]: [
          {
            [NAME]: name2,
            [VALIDATOR]: validateIsArrayOf(validateIsPlainObject),
            [CHILDREN]: REPLACE_TOKEN,
          },
        ],
      },
    },
  ],
}

const level3ExpectedFailureObjRoot = {
  [FIELDS]: {
    [name1]: {
      [CHILDREN]: {
        '0': {
          [FIELDS]: {
            [name2]: {
              [CHILDREN]: {
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
