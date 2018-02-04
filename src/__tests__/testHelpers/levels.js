import { CONSTRAINT_FIELD_NAMES } from '../../const';
import { name1 } from './fixtures/constraintValues';
import { constraintsObjPrefix } from '../../messages';
import { func } from './fixtures';
import { REPLACE_TOKEN } from './const';

const { FIELDS, NAME, VALIDATOR, CHILDREN } = CONSTRAINT_FIELD_NAMES;

const CONSTRAINTS = constraintsObjPrefix();

const level1Expected = null;

const level1Value = null;

const level2Value = {
  [FIELDS]: [
    {
      [NAME]: name1,
      [VALIDATOR]: func,
      [CHILDREN]: REPLACE_TOKEN,
    },
  ],
};

const level2Expected = {
  [NAME]: `constraints`,
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
};

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
};

const level3Expected = {
  [NAME]: `constraints`,
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
};

export default [
  [level1Value, level1Expected],
  [level2Value, level2Expected],
  [level3Value, level3Expected],
];
