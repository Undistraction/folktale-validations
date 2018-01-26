import { FIELD_NAMES } from '../../const';

export const allValues = [
  [],
  {},
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notBooleanValues = [
  [],
  {},
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
];

export const notArrayValues = [
  {},
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notObjectValues = [
  [],
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notStringValues = [
  [],
  {},
  function() {},
  /x/,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notFunctionValues = [
  [],
  {},
  ``,
  /x/,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const func = () => {};

export const flatErrorMessage = {
  a: `errorMessageForA`,
  b: `errorMessageForB`,
  c: `errorMessageForC`,
};

export const nestedObjectErrorMessage = {
  a: `errorMessageForA`,
  b: {
    ba: `errorMessageForBA`,
  },
  c: `errorMessageForC`,
};

export const nestedArrayErrorMessage = {
  a: `errorMessageForA`,
  b: [
    {
      b1a: `errorMessageForB1A`,
      b1b: `errorMessageForB1A`,
    },
    {
      b2a: `errorMessageForB2B`,
    },
  ],
  c: `errorMessageForC`,
};

export const deeplyNestedErrorMessage = {
  a: `errorMessageForA`,
  b: [
    {
      b1a: `errorMessageForBA`,
      b1b: {
        b1ba: `errorMessageForB1BA`,
      },
    },
    {
      b2a: `errorMessageForBB`,
      b2b: [
        {
          b2b1a: `errorMessageForB2B1A`,
          b2b1b: `errorMessageForB2B1B`,
        },
      ],
    },
  ],
  c: `errorMessageForC`,
};
